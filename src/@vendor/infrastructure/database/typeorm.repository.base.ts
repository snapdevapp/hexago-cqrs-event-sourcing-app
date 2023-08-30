import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { AggregateRoot } from '@vendor/domain/aggregate-root.base';
import { DomainEvents } from '@vendor/domain/domain-events';
import { ID } from '@vendor/domain/value-objects/id.value-object';
import { NotFoundException } from '@vendor/domain/exception';
import {
  RepositoryPort,
  QueryParams,
  FindManyPaginatedParams,
  DataWithPaginationMeta,
} from '@vendor/domain/ports/repository.port';
import { LoggerPort } from '@vendor/domain/ports/logger.port';
import { OrmMapper } from './orm-mapper.base';
import { DeepPartial } from '@vendor/domain/types';

export type WhereCondition<OrmEntity> =
  | FindOptionsWhere<OrmEntity>[]
  | FindOptionsWhere<OrmEntity>
  | DeepPartial<ID & string>
  | ObjectLiteral;

export abstract class TypeormRepositoryBase<Entity extends AggregateRoot<unknown>, EntityProps, OrmEntity>
  implements RepositoryPort<Entity, EntityProps>
{
  protected constructor(
    protected readonly repository: Repository<OrmEntity>,
    protected readonly mapper: OrmMapper<Entity, OrmEntity>,
    protected readonly logger: LoggerPort,
  ) {}

  withRelations(relations: string[]): this {
    this.relations = relations;
    return this;
  }

  /**
   * Specify relations to other tables.
   * For example: `relations = ['user', ...]`
   */
  protected abstract relations: string[];

  protected tableName = this.repository.metadata.tableName;

  protected abstract prepareQuery(
    params: QueryParams<EntityProps>,
  ): FindOptionsWhere<OrmEntity>[] | FindOptionsWhere<OrmEntity>;

  async save(entity: Entity): Promise<Entity> {
    entity.validate(); // Protecting invariant before saving
    const ormEntity = this.mapper.toOrmEntity(entity);
    const result = await this.repository.save(ormEntity);
    await DomainEvents.publishEvents(entity.id, this.logger, this.correlationId);
    this.logger.debug(`[${entity.constructor.name}] persisted ${entity.id.value}`);
    return this.mapper.toDomainEntity(result);
  }

  async saveMany(entities: Entity[]): Promise<Entity[]> {
    const ormEntities = entities.map(entity => {
      entity.validate();
      return this.mapper.toOrmEntity(entity);
    });
    const result = await this.repository.save(ormEntities);
    await Promise.all(entities.map(entity => DomainEvents.publishEvents(entity.id, this.logger, this.correlationId)));
    this.logger.debug(`[${entities}]: persisted ${entities.map(entity => entity.id)}`);
    return result.map(entity => this.mapper.toDomainEntity(entity));
  }

  async findOne(params: QueryParams<EntityProps> = {}): Promise<Entity | undefined> {
    const where = this.prepareQuery(params);
    const found = await this.repository.findOne({
      where,
      relations: this.relations,
    });
    this.relations = [];
    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findOneOrThrow(params: QueryParams<EntityProps> = {}): Promise<Entity> {
    const found = await this.findOne(params);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async findOneByIdOrThrow(id: ID | string): Promise<Entity> {
    const result = await this.repository
      .createQueryBuilder()
      .where({
        where: { id: id instanceof ID ? id.value : id },
      })
      .getOne();

    if (!result) {
      throw new NotFoundException();
    }
    return this.mapper.toDomainEntity(result);
  }

  async findMany(params: QueryParams<EntityProps> = {}): Promise<Entity[]> {
    const result = await this.repository.find({
      where: this.prepareQuery(params),
      relations: this.relations,
    });

    this.relations = [];
    return result.map(item => this.mapper.toDomainEntity(item));
  }

  async findManyPaginated({
    params = {},
    pagination,
    orderDirection,
  }: FindManyPaginatedParams<EntityProps>): Promise<DataWithPaginationMeta<Entity[]>> {
    const [data, count] = await this.repository
      .createQueryBuilder()
      .skip(pagination?.skip)
      .take(pagination?.limit)
      .orderBy(orderDirection)
      .where(this.prepareQuery(params))
      .getManyAndCount();

    const result: DataWithPaginationMeta<Entity[]> = {
      data: data.map(item => this.mapper.toDomainEntity(item)),
      count,
      limit: pagination?.limit,
      page: pagination?.page,
    };

    return result;
  }

  async delete(entity: Entity): Promise<Entity> {
    entity.validate();
    await this.repository.remove(this.mapper.toOrmEntity(entity));
    await DomainEvents.publishEvents(entity.id, this.logger, this.correlationId);
    this.logger.debug(`[${entity.constructor.name}] deleted ${entity.id.value}`);
    return entity;
  }

  protected correlationId?: string;

  setCorrelationId(correlationId: string): this {
    this.correlationId = correlationId;
    this.setContext();
    return this;
  }

  private setContext() {
    if (this.correlationId) {
      this.logger.setContext(`${this.constructor.name}:${this.correlationId}`);
    } else {
      this.logger.setContext(this.constructor.name);
    }
  }
}
