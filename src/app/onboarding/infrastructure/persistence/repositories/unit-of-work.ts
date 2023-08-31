import { TypeormUnitOfWork } from '@vendor/infrastructure/database/typeorm-unit-of-work';
import { ClientRepositoryPort } from '@src/app/onboarding/core/application/ports';
import { UnitOfWorkPort } from '@src/app/onboarding/core/application/ports';
import { ClientOrmEntity } from '@src/app/onboarding/infrastructure/persistence/orm-entities/client.orm-entity';
import { ClientRepository } from '@src/app/onboarding/infrastructure/persistence/repositories/client.repository';

export class UnitOfWork extends TypeormUnitOfWork implements UnitOfWorkPort {
  getClientRepository(correlationId: string): ClientRepositoryPort {
    return new ClientRepository(this.getOrmRepository(ClientOrmEntity, correlationId)).setCorrelationId(correlationId);
  }
}
