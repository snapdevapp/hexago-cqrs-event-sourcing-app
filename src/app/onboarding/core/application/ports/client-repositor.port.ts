import { RepositoryPort } from '@vendor/domain/ports';
import { ClientEntity, ClientProps } from '../../domain/entities';

export interface ClientRepositoryPort extends RepositoryPort<ClientEntity, ClientProps> {
  findClient(clientId: string): Promise<ClientEntity | undefined>;
}
