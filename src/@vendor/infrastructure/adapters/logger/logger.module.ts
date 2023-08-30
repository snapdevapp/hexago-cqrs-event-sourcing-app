import { LoggerAdapter } from '@vendor/infrastructure/adapters/logger/logger.adapter';
import { Global, Module, Provider } from '@nestjs/common';

const loggerProvider: Provider = {
  provide: LoggerAdapter,
  useFactory: async () => new LoggerAdapter('app-api', { timestamp: true }),
};

@Global()
@Module({
  imports: [],
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class LoggerModule {}
