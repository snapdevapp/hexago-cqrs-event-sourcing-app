import { Result } from '@badrap/result';
import { ApplicationServiceInput, ApplicationServicePort } from '@vendor/application/application.service';
import { LoggerPort } from '@vendor/domain/ports';
import { ID } from '@vendor/domain/value-objects/id.value-object';
import { IEventBus } from '@nestjs/cqrs';
import { ClientEntity } from '../../domain/entities/client.entity';
import { ClientRepositoryPort, UnitOfWorkPort } from '../ports';
import { ClientCreated } from '../events/client-created.event';

export interface ExecuteSendWelcomeEmailInput extends ApplicationServiceInput {
  readonly correlationId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly number: string;
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
    const { correlationId, firstName, lastName, email } = input;

    const clientRepository: ClientRepositoryPort = this.unitOfWork.getClientRepository(correlationId);
    const client: ClientEntity = ClientEntity.create({ firstName, lastName, email });

    clientRepository.save(client);

    this.eventBus.publish(new ClientCreated({ clientId: client.id.value }));

    return Result.ok(client.id);
  }
}
