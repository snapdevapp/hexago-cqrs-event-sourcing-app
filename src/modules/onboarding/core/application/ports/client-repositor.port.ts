import { ClientEntity } from '../../domain/entities';

export interface ClientRepositoryPort {
  findClient(clientId: string): Promise<ClientEntity | undefined>;
}
