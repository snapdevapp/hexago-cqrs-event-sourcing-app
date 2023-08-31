import { ExecuteSendWelcomeEmailHanlder } from './interface/commands/execute-send-welcome-email.command';
import { UnitOfWorkPort } from './core/application/ports';
import { UnitOfWork } from './infrastructure/persistence/repositories/unit-of-work';
import { EventBus, IEventBus } from '@nestjs/cqrs';
import { LoggerAdapter } from '@vendor/infrastructure/adapters';
import { ExecuteSendWelcomeEmailService } from './core/application/services/execute-send-welcome-email.service';

export const executeSendWelcomeEmailProvider = {
  provide: ExecuteSendWelcomeEmailHanlder,
  useFactory: (unitOfWork: UnitOfWorkPort, eventBus: IEventBus): ExecuteSendWelcomeEmailHanlder => {
    const service = new ExecuteSendWelcomeEmailService(unitOfWork, eventBus, new LoggerAdapter());
    return new ExecuteSendWelcomeEmailHanlder(unitOfWork, service);
  },
  inject: [UnitOfWork, EventBus, LoggerAdapter],
};
