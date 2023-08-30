import { LoggerPort } from '@vendor/domain/ports';
import { BaseUnitOfWorkPort, UnitOfWorkOptions } from '@vendor/domain/ports/base-unit-of-work.port';
import { Result } from '@vendor/domain/utils/result.util';
import { IEventBus } from './application.event';

export interface ApplicationServiceInput {
  correlationId: string;
}

export abstract class ApplicationServicePort<ApplicationServiceOutput, ApplicationServiceError extends Error> {
  constructor(
    protected readonly unitOfWork: BaseUnitOfWorkPort,
    protected readonly eventBus: IEventBus,
    protected readonly logger: LoggerPort,
  ) {}

  // Forces all application services to implement a run method
  abstract run(input: ApplicationServiceInput): Promise<Result<ApplicationServiceOutput, ApplicationServiceError>>;

  /**
   * Execute a service as a UnitOfWork to include
   * everything in a single atomic database transaction
   */
  execute(
    input: ApplicationServiceInput,
    options?: UnitOfWorkOptions,
  ): Promise<Result<ApplicationServiceOutput, ApplicationServiceError>> {
    this.logger.log(input);
    return this.unitOfWork.execute(input.correlationId, async () => this.run(input), options);
  }
}
