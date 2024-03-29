import { UUID } from '@vendor/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@vendor/infrastructure/database/orm-mapper.base';
import { ClientEntity, ClientProps } from '@src/app/onboarding/core/domain/entities';
import { ClientOrmEntity } from '@src/app/onboarding/infrastructure/persistence/orm-entities';

export class ClientOrmMapper extends OrmMapper<ClientEntity, ClientOrmEntity> {
  protected toDomainProps(ormEntity: ClientOrmEntity): EntityProps<unknown> {
    const id = new UUID(ormEntity.id);
    const props: ClientProps = {
      firstName: ormEntity.firstName,
      lastName: ormEntity.lastName,
      email: ormEntity.email,
      gender: ormEntity.gender,
    };
    return { id, props };
  }

  protected toOrmProps(entity: ClientEntity): OrmEntityProps<ClientOrmEntity> {
    throw new Error(`Method not implemented. entity id : ${entity.id}`);
  }
}
