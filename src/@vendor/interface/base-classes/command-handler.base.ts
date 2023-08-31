import { BaseUnitOfWorkPort } from '@vendor/domain/ports/base-unit-of-work.port';
import { Result } from '@vendor/domain/utils/result.util';
import { Command } from './command.base';

export abstract class CommandHandlerBase<
  CommandHandlerReturnType = unknown,
  CommandHandlerError extends Error = Error,
> {
  constructor(protected readonly unitOfWork: BaseUnitOfWorkPort) {}

  // Forces all command handlers to implement a handle method
  abstract process(command: Command): Promise<Result<CommandHandlerReturnType, CommandHandlerError>>;

  execute(command: Command): Promise<Result<CommandHandlerReturnType, CommandHandlerError>> {
    return this.process(command);
  }
}
