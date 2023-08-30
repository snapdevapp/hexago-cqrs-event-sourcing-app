import { IIdRequestParam } from '@vendor/interface-adapters/requests/id-request-param.interface';
import { IsUUID } from 'class-validator';

export class IdHttpRequestParam implements IIdRequestParam {
  @IsUUID()
  id: string;
}
