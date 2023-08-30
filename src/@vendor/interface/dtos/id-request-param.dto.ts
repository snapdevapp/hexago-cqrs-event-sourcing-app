import { IsUUID } from 'class-validator';

export class IdHttpRequestParam {
  @IsUUID()
  id: string;
}
