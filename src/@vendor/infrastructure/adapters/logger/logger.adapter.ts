import { LoggerPort } from '@vendor/domain/ports/logger.port';
import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class LoggerAdapter extends NestLogger implements LoggerPort {
  setContext(context: string): void {
    throw new Error('Method not implemented.');
  }

  error(message: unknown, trace?: string, context?: string): void {
    super.error(message, trace, context);
  }

  warn(message: unknown, context?: string): void {
    super.warn(message, context);
  }
}
