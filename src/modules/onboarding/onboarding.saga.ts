import { UseInterceptors } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { IEvent } from '@vendor/application/application.event';
import { SentryInterceptor } from '@vendor/interface/interceptors/sentry.interceptor';
import { ClientCreated } from './core/application/events/client-created.event';
import { OnboardingSagaPort } from './core/application/ports/onboarding.saga.port';
import { ExecuteSendWelcomeEmail } from './interface/commands/execute-send-welcome-email.command';

@UseInterceptors(SentryInterceptor)
export class OnboardingSaga implements OnboardingSagaPort<Observable<IEvent>, Observable<ICommand>> {
  @Saga()
  executeClientCreatedEvent(events$: Observable<IEvent>): Observable<ICommand> {
    return events$.pipe(
      ofType(ClientCreated),
      delay(200),
      map(event => {
        return new ExecuteSendWelcomeEmail({
          ...event,
        });
      }),
    );
  }
}
