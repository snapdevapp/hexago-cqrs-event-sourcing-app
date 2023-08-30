import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const ClientId = createParamDecorator(async (data: unknown, ctx: ExecutionContext): Promise<string> => {
  const request = ctx.switchToHttp().getRequest();
  if (request.clientId) {
    return request.clientId;
  }
  throw new UnauthorizedException();
});
