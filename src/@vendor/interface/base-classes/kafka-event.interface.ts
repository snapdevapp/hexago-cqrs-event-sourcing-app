// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isKafkaEvent(arg: any): arg is IKafkaEvent {
  return arg && arg.getSchemaId && typeof arg.getSchemaId === 'function';
}

export default interface IKafkaEvent {
  getSchemaId?(): number;
}
