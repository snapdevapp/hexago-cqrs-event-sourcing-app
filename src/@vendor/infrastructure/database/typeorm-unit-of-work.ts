import { LoggerPort } from '@vendor/domain/ports/logger.port';
import { BaseUnitOfWorkPort, UnitOfWorkOptions } from '@vendor/domain/ports/base-unit-of-work.port';
import { Result } from '@vendor/domain/utils/result.util';
import { DataSource, EntityTarget, QueryRunner, Repository } from 'typeorm';
import { dataSource } from './../config/config.service';

/**
 * Keep in mind that this is a naive implementation
 * of a Unit of Work as it only wraps execution into
 * a transaction. Proper Unit of Work implementation
 * requires storing all changes in memory first and
 * then execute a transaction as a singe database call.
 * Mikro-orm (https://www.npmjs.com/package/mikro-orm)
 * is a nice ORM for nodejs that can be used instead
 * of typeorm to have a proper Unit of Work pattern.
 * Read more about mikro-orm unit of work:
 * https://mikro-orm.io/docs/unit-of-work/.
 */
export class TypeormUnitOfWork implements BaseUnitOfWorkPort {
  protected readonly dataSource: DataSource = dataSource;

  private queryRunners: Map<string, QueryRunner> = new Map();

  constructor(private readonly logger: LoggerPort) {}

  getQueryRunner(correlationId: string): QueryRunner {
    const queryRunner = this.queryRunners.get(correlationId);
    if (!queryRunner) {
      throw new Error(
        'Query runner not found. Incorrect correlationId or transaction is not started. To start a transaction wrap operations in a "execute" method.',
      );
    }
    return queryRunner;
  }

  getOrmRepository<Entity>(entity: EntityTarget<Entity>, correlationId?: string): Repository<Entity> {
    const queryRunner = this.getQueryRunner(correlationId);
    return queryRunner.manager.getRepository(entity);
  }

  /**
   * Execute a UnitOfWork.
   * Database operations wrapped in a `execute` method will run
   * in a single transactional operation, so everything gets
   * saved (including changes done by Domain Events) or nothing at all.
   */
  async execute<T>(
    correlationId: string,
    callback: () => Promise<T>,
    options?: UnitOfWorkOptions,
    afterRollback?: () => Promise<T>,
  ): Promise<T> {
    if (!correlationId) {
      throw new Error('Correlation ID must be provided');
    }
    this.logger.setContext(`${this.constructor.name}:${correlationId}`);
    let queryRunner;
    if (options?.replicationMode) {
      queryRunner = this.dataSource.createQueryRunner(options.replicationMode);
    } else {
      queryRunner = this.dataSource.createQueryRunner();
    }
    this.queryRunners.set(correlationId, queryRunner);
    this.logger.debug(`[query transaction starting]`);
    await queryRunner.startTransaction(options?.isolationLevel);
    let result: T | Result<T>;
    try {
      result = await callback();
      if ((result as unknown as Result<T>)?.isErr) {
        await this.rollbackTransaction(correlationId, (result as unknown as Result.Err<T, Error>).error);
        return result;
      }
    } catch (error) {
      await this.rollbackTransaction(correlationId, error as Error);
      if (afterRollback !== undefined) {
        await afterRollback();
      }
      throw error;
    }
    try {
      await queryRunner.commitTransaction();
    } finally {
      await this.finish(correlationId);
    }
    this.logger.debug(`[Transaction committed]`);
    return result;
  }

  private async rollbackTransaction(correlationId: string, error: Error) {
    const queryRunner = this.getQueryRunner(correlationId);
    try {
      await queryRunner.rollbackTransaction();
      this.logger.debug(`[Transaction rolled back] ${(error as Error).message}`);
    } finally {
      await this.finish(correlationId);
    }
  }

  private async finish(correlationId: string): Promise<void> {
    const queryRunner = this.getQueryRunner(correlationId);
    try {
      await queryRunner.release();
    } finally {
      this.queryRunners.delete(correlationId);
    }
  }
}
