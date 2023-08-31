import { ErrorBase } from '@vendor/domain/exception/error.base';

export class ProfileDoesNotExistError extends ErrorBase {}

export type ClientError = ProfileDoesNotExistError;
