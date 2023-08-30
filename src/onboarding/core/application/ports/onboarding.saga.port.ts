export interface OnboardingSagaPort<ObservableEventInterface, ObservableCommandInterface> {
  executeClientCreatedEvent(events$: ObservableEventInterface): ObservableCommandInterface;
}
