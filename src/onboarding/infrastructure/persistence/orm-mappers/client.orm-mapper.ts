import { UUID } from '@vendor/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@vendor/infrastructure/database/orm-mapper.base';
import { ClientEntity, ClientProps } from '@src/onboarding/core/domain/entities';
import { ClientOrmEntity } from '@src/onboarding/infrastructure/persistence/orm-entities';

export class ClientOrmMapper extends OrmMapper<ClientEntity, ClientOrmEntity> {
  protected toDomainProps(ormEntity: ClientOrmEntity): EntityProps<unknown> {
    const id = new UUID(ormEntity.id);
    const props: ClientProps = {};
    return { id, props };
  }

  protected toOrmProps(entity: ClientEntity): OrmEntityProps<ClientOrmEntity> {
    throw new Error(`Method not implemented. entity id : ${entity.id}`);
  }
}
