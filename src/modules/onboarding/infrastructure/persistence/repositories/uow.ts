import { TypeormUnitOfWork } from '@vendor/infrastructure/database/typeorm-unit-of-work';
import { ClientRepositoryPort } from '@modules/onboarding/core/application/ports';
import { UnitOfWorkPort } from '@modules/onboarding/core/application/ports';
import { ClientOrmEntity } from '@modules/onboarding/infrastructure/persistence/orm-entities/client.orm-entity';
import { ClientRepository } from '@modules/onboarding/infrastructure/persistence/repositories/client.repository';

export class UnitOfWork extends TypeormUnitOfWork implements UnitOfWorkPort {
  getClientRepository(correlationId: string): ClientRepositoryPort {
    return new ClientRepository(this.getOrmRepository(ClientOrmEntity, correlationId)).setCorrelationId(correlationId);
  }
}
