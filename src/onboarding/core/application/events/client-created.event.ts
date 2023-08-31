import { ApplicationEvent, ApplicationEventProps } from '@vendor/application/application.event';

export class ClientCreated implements ApplicationEvent<ClientCreated> {
  constructor(props: ApplicationEventProps<ClientCreated>) {
    this.clientId = props.clientId;
  }
  readonly dateOccurred: number;
  readonly clientId: string;
}
