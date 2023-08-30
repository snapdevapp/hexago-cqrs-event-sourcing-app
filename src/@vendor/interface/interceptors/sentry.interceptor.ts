import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  // To avoid confusion between internal app exceptions and NestJS exceptions
  ConflictException,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionBase } from '@vendor/domain/exception';
import * as Sentry from '@sentry/minimal';

export const createSentryContext = (_context: ExecutionContext): void => {
  const contextType = _context.getType();
  if (contextType === 'http') {
    const req = _context.switchToHttp().getRequest();
    if (req.clientId) {
      Sentry.setUser({
        id: req.clientId,
        ip_address: req.ip,
      });
    }
    Sentry.setContext('http', {
      id: req.id,
      method: req.method,
      url: req.url,
      headers: req.headers,
    });
  } else if (contextType === 'rpc') {
    const rpc = _context.switchToRpc();
    Sentry.setContext('rpc', {
      context: rpc.getContext(),
      data: rpc.getData(),
    });
  }

  // Define the handler context
  Sentry.setContext('handler', {
    name: _context.getClass().name,
    method: _context.getHandler().name,
  });
};

export class SentryInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<ExceptionBase> {
    return next.handle().pipe(
      catchError(exception => {
        createSentryContext(_context);

        if (![NotFoundException, ConflictException, NotAcceptableException].includes(exception.name)) {
          Sentry.captureException(exception);
        }

        return throwError(exception);
      }),
    );
  }
}
