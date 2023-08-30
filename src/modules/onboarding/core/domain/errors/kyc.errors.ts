import { ErrorBase } from '@vendor/domain/exception/error.base';

export class EmptyKycFileError extends ErrorBase {}
export class InvalidKycFileMimeTypeError extends ErrorBase {}
export class ClientDoesNotExistError extends ErrorBase {}
export class ClientKycAlreadyCompletedError extends ErrorBase {}

export type KycError =
  | EmptyKycFileError
  | InvalidKycFileMimeTypeError
  | ClientDoesNotExistError
  | ClientKycAlreadyCompletedError;
