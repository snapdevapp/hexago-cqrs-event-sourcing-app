import { ConfigService } from '@vendor/infrastructure/config';
import {
  AppSyncClientEventRequest,
  AppSyncClientEventResponse,
  AppSyncError,
  AppSyncGatewayPort,
} from '@modules/banking/core/application/ports/app-sync.gateway.port';
import { print } from 'graphql';
import { ObjectLiteral } from '@vendor/domain/types';
import { Injectable } from '@nestjs/common';
import { ProxyService } from '@djamoapp/proxy';
import { HttpRequestConfig } from '@djamoapp/proxy/dist/proxy/bootstrap/dtos/http-request-config.dto';
import {
  sendClientEventMutation,
  sendClientEventMutationWithResource,
} from './graphql/mutations/send-client-event.mutation';

@Injectable()
export class AppSyncGateway implements AppSyncGatewayPort {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {}

  async sendClientEvent(request: AppSyncClientEventRequest): Promise<AppSyncClientEventResponse | AppSyncError> {
    const { clientId, eventName, resourceId } = request;

    try {
      const query = resourceId ? print(sendClientEventMutationWithResource) : print(sendClientEventMutation);
      const variables = resourceId
        ? {
            clientId,
            eventName,
            resourceId,
          }
        : {
            clientId,
            eventName,
          };
      const body: HttpRequestConfig = {
        url: this.configService.get('appSyncUrl'),
        method: 'post',
        data: {
          query,
          variables,
        },
        headers: { 'x-api-key': this.configService.get('appSyncApiKey') },
      };

      const mutation = await this.proxyService.sendRequest<ObjectLiteral, ObjectLiteral>(body);

      if (mutation.code === 200) {
        return {
          code: mutation.code,
          data: mutation.data,
        };
      }
    } catch (error) {
      return {
        id: clientId,
        code: -1,
        message: error.message,
      };
    }
  }
}
