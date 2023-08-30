import { UUID } from '@libs/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/infrastructure/database/orm-mapper.base';

import { ProfileEntity, ProfileProps } from '@modules/onboarding/core/domain/entities/profile.entity';
import { ProfileOrmEntity } from '@modules/onboarding/infrastructure/persistence/orm-entities/profile.orm-entity';

export class ProfileOrmMapper extends OrmMapper<ProfileEntity, ProfileOrmEntity> {
  protected toDomainProps(ormEntity: ProfileOrmEntity): EntityProps<unknown> {
    const id = new UUID(ormEntity.id);
    const props: ProfileProps = {
      email: ormEntity.email,
      firstName: ormEntity.firstName,
      lastName: ormEntity.firstName,
      dateOfBirth: ormEntity.dateOfBirth,
      photoUrl: ormEntity.photo,
      profileStatus: ormEntity.status,
      activity: ormEntity.activity,
      monthlyIncome: ormEntity.monthlyIncome,
    };

    return { id, props };
  }

  protected toOrmProps(entity: ProfileEntity): OrmEntityProps<ProfileOrmEntity> {
    const props = entity.getPropsCopy();
    const ormProps: OrmEntityProps<ProfileOrmEntity> = {
      email: props.email,
      lastName: props.lastName,
      firstName: props.firstName,
      dateOfBirth: props.dateOfBirth,
      status: props.profileStatus,
      profileVerificationStatus: props.profileVerificationStatus,
      activity: props.activity,
      monthlyIncome: props?.monthlyIncome,
      document: props.document,
      gender: props.gender,
      photo: props.photoUrl,
      homeLocation: props.homeLocation,
    };
    return ormProps;
  }
}
