import { ArgumentNotProvidedException } from '@vendor/domain/exception';
import { Guard } from '@vendor/domain/guards/guard';

export interface IEvent {
  readonly dateOccurred: number;
}

export interface IEventBus<EventBase extends IEvent = IEvent> {
  publish<T extends EventBase = EventBase>(event: T): void;
  publishAll?<T extends EventBase = EventBase>(events: T[]): void;
}

export type ApplicationEventProps<T> = Omit<T, 'dateOccurred'> &
  Omit<ApplicationEvent, 'dateOccurred'> & {
    dateOccurred?: number;
  };

export abstract class ApplicationEvent implements IEvent {
  public readonly dateOccurred: number;

  constructor(props: ApplicationEventProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('ApplicationEvent props should not be empty');
    }
    this.dateOccurred = props.dateOccurred || Date.now();
  }
}
