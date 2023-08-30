import { TypeormUnitOfWork } from '@vendor/infrastructure/database/typeorm-unit-of-work';
import { ClientRepositoryPort } from '@src/onboarding/core/application/ports';
import { UnitOfWorkPort } from '@src/onboarding/core/application/ports';
import { ClientOrmEntity } from '@src/onboarding/infrastructure/persistence/orm-entities/client.orm-entity';
import { ClientRepository } from '@src/onboarding/infrastructure/persistence/repositories/client.repository';

export class UnitOfWork extends TypeormUnitOfWork implements UnitOfWorkPort {
  getClientRepository(correlationId: string): ClientRepositoryPort {
    return new ClientRepository(this.getOrmRepository(ClientOrmEntity, correlationId)).setCorrelationId(correlationId);
  }
}
