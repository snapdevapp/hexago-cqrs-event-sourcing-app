import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@vendor/infrastructure/config/config.service';

@Injectable()
export class ApiKeyValidator implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    try {
      return new Promise(resolve => {
        if (apiKey === this.configService.get('key')) {
          resolve(true);
        } else {
          Logger.error(`\nThe specified API KEY is invalid - apikey used :${apiKey}`, ApiKeyValidator.name);
          resolve(false);
        }
      });
    } catch (error) {
      Logger.error(
        `An error occured while getting client from token - message : ${(error as Error).message}`,
        ApiKeyValidator.name,
      );
      return false;
    }
  }
}
