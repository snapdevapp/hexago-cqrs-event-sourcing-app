import { UUID } from '@libs/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/infrastructure/database/orm-mapper.base';

import { SettingEntity, SettingProps } from '@modules/onboarding/core/domain/entities';
import { SettingOrmEntity } from '@modules/onboarding/infrastructure/persistence/orm-entities';

export class SettingOrmMapper extends OrmMapper<SettingEntity, SettingOrmEntity> {
  protected toDomainProps(ormEntity: SettingOrmEntity): EntityProps<unknown> {
    const id = new UUID(ormEntity.id);
    const props: SettingProps = {
      ...ormEntity,
    };
    return { id, props };
  }

  protected toOrmProps(entity: SettingEntity): OrmEntityProps<SettingOrmEntity> {
    return undefined;
  }
}
