import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../infrastructure/config/config.service';

const configService = new ConfigService();

export const CheckApiKey = createParamDecorator((data: unknown, ctx: ExecutionContext): Promise<string> => {
  const request = ctx.switchToHttp().getRequest();
  if (request.header('x-api-key') !== configService.get('appSyncApiKey')) {
    return request.header('x-api-key');
  }
  throw new UnauthorizedException();
});
