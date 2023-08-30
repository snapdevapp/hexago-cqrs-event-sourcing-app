import { ApplicationEvent } from '@vendor/application/application.event';

export class ClientCreated implements ApplicationEvent {
  public dateOccurred: number;
}
