import { BaseUnitOfWorkPort } from '@vendor/domain/ports';
import { ClientRepositoryPort } from './client-repositor.port';

export interface UnitOfWorkPort extends BaseUnitOfWorkPort {
  getClientRepository(correlationId: string): ClientRepositoryPort;
}
