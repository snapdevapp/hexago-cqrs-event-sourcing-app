import { ExceptionBase } from './exception.base';

export abstract class ErrorBase extends ExceptionBase {
  public readonly code: string;

  constructor(arg?: { message?: string; metadata?: unknown }) {
    super(arg?.message ?? ErrorBase.name, arg?.metadata);
    this.code = this.constructor.name;
  }
}
