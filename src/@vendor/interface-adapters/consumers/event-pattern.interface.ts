export interface IEventManagerPayloadMetadata {
  guid: string;
  name: string;
  application: string;
  timestamp: number;
  replyTo?: string;
  [k: string]: unknown;
}

export type IPayload = {
  [key: string]: unknown;
};

export interface IMessagePayload {
  _metadata?: Partial<IEventManagerPayloadMetadata>;
  payload: IPayload;
  [k: string]: unknown;
}
