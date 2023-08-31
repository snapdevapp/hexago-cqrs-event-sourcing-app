import { Result } from '@badrap/result';
import { ApplicationServiceInput, ApplicationServicePort } from '@vendor/application/application.service';
import { LoggerPort } from '@vendor/domain/ports';
import { ID } from '@vendor/domain/value-objects/id.value-object';
import { IEventBus } from '@vendor/application/application.event';
import { ClientEntity } from '../../domain/entities/client.entity';
import { ClientRepositoryPort, UnitOfWorkPort } from '../ports';

export interface ExecuteSendWelcomeEmailInput extends ApplicationServiceInput {
  readonly correlationId: string;
  readonly clientId: string;
}

export class ExecuteSendWelcomeEmailService extends ApplicationServicePort<ID, Error> {
  /**
   * @constructor
   * @param unitOfWork
   * @param eventBus
   * @param logger
   */
  constructor(
    protected readonly unitOfWork: UnitOfWorkPort,
    protected readonly eventBus: IEventBus,
    protected readonly logger: LoggerPort,
  ) {
    super(unitOfWork, eventBus, logger);
  }

  async run(input: ExecuteSendWelcomeEmailInput): Promise<Result<ID, Error>> {
    const { correlationId, clientId } = input;

    const clientRepository: ClientRepositoryPort = this.unitOfWork.getClientRepository(correlationId);

    const client: ClientEntity = await clientRepository.findClient(clientId);

    // Send email action ici

    return Result.ok(client.id);
  }
}
