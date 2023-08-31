import { Result } from '@badrap/result';
import { UnitOfWorkPort } from '@src/onboarding/core/application/ports';
import { CommandHandler } from '@nestjs/cqrs';
import { ApplicationServicePort } from '@vendor/application/application.service';
import { ID } from '@vendor/domain/value-objects/id.value-object';
import { CommandHandlerBase } from '@vendor/interface/base-classes/command-handler.base';
import { Command } from '@vendor/interface/base-classes/command.base';
import { ExecuteSendWelcomeEmailInput } from '@onboarding/core/application/services/execute-send-welcome-email.service';

export class ExecuteSendWelcomeEmailCommand extends Command implements ExecuteSendWelcomeEmailInput {
  clientId: string;
}

@CommandHandler(ExecuteSendWelcomeEmailCommand)
export class ExecuteSendWelcomeEmailHanlder extends CommandHandlerBase<ID, Error> {
  constructor(
    protected readonly unitOfWork: UnitOfWorkPort,
    private readonly applicationService: ApplicationServicePort<ID, Error>,
  ) {
    super(unitOfWork);
  }

  process(command: ExecuteSendWelcomeEmailCommand): Promise<Result<ID, Error>> {
    return this.applicationService.run(command);
  }
}
