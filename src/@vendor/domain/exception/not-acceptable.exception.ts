import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';

export class NotAcceptableException extends ExceptionBase {
  readonly code = ExceptionCodes.conflict;
}
