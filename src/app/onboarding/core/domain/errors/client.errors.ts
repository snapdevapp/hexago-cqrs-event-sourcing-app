import { ErrorBase } from '@vendor/domain/exception/error.base';

export class ClientDoesNotExistError extends ErrorBase {}

export type ClientError = ClientDoesNotExistError;
