import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@vendor/infrastructure/config/config.service';

interface Client {
  id: string;
}

interface HttpError {
  message: string;
  status: number;
}

@Injectable()
export class AuthValidator implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.header('Authorization');
    const token = authorization?.split(' ')[1];
    try {
      return new Promise(resolve => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        this.httpService
          .request<Client>({
            url: `${this.configService.get('authUrl')}/clients/get-client-fromtoken`,
            method: 'post',
            headers,
            data: { token },
          })
          .subscribe({
            next: response => {
              if (response.data) {
                request.clientId = response.data.id;
                resolve(true);
              }
              resolve(false);
            },
            error: error => {
              const httpError = error as HttpError;
              Logger.error(
                `\nAn error occured while getting client from token - status : ${httpError.status} - message : ${httpError.message}`,
                AuthValidator.name,
              );
              resolve(false);
            },
          });
      });
    } catch (error) {
      Logger.error(
        `An error occured while getting client from token - message : ${(error as Error).message}`,
        AuthValidator.name,
      );
      return false;
    }
  }
}
