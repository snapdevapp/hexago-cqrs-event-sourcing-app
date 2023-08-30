import { IWithE164RequestQuery } from '@vendor/interface-adapters/requests/with-e164-request-query.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsPhoneNumber } from 'class-validator';

export class WithE164HttpRequestQuery implements IWithE164RequestQuery {
  @Transform(arg => `+${arg.value}`)
  @IsPhoneNumber()
  @ApiProperty({
    description: "E.164 format of the peer's phone number",
    type: String,
    format: 'e164',
    example: '+2250788177777',
  })
  withE164: string;
}
