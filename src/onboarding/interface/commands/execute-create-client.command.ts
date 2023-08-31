import { Result } from '@badrap/result';
import { CommandHandler } from '@nestjs/cqrs';
import { UnitOfWorkPort } from '@onboarding/core/application/ports';
import { ApplicationServicePort } from '@vendor/application/application.service';
import { ID } from '@vendor/domain/value-objects/id.value-object';
import { CommandHandlerBase } from '@vendor/interface/base-classes/command-handler.base';
import { Command } from '@vendor/interface/base-classes/command.base';

export class ExecuteCreateClientCommand extends Command {}

@CommandHandler(ExecuteCreateClientCommand)
export class ExecuteCreateClientCommandHandler extends CommandHandlerBase<ID, Error> {
  constructor(
    protected readonly unitOfWork: UnitOfWorkPort,
    protected readonly applicationService: ApplicationServicePort<ID, Error>,
  ) {
    super(unitOfWork);
  }

  process(command: ExecuteCreateClientCommand): Promise<Result<ID, Error>> {
    return this.applicationService.run(command);
  }
}
