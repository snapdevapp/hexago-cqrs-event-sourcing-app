/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AggregateRoot } from '@vendor/domain/aggregate-root.base';
import { CreateEntityProps } from '@vendor/domain/entity.base';
import { ID } from '@vendor/domain/value-objects/id.value-object';
import { TypeormEntityBase } from './typeorm.entity.base';

export type OrmEntityProps<OrmEntity> = Omit<OrmEntity, 'id' | 'isActive'>;

export interface EntityProps<EntityProps> {
  id: ID;
  props: EntityProps;
}

export abstract class OrmMapper<Entity extends AggregateRoot<unknown>, OrmEntity> {
  constructor(
    private entityConstructor: new (props: CreateEntityProps<any>) => Entity,
    private ormEntityConstructor: new (props: any) => OrmEntity,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): EntityProps<unknown>;

  protected abstract toOrmProps(entity: Entity): OrmEntityProps<OrmEntity>;

  toDomainEntity(ormEntity: OrmEntity): Entity {
    const { id, props } = this.toDomainProps(ormEntity);
    const ormEntityBase: TypeormEntityBase = ormEntity as unknown as TypeormEntityBase;
    return new this.entityConstructor({
      id,
      props,
      isActive: ormEntityBase.isActive,
    });
  }

  toDomainEntityFromTuple(ormEntities: [OrmEntity, TypeormEntityBase]): Entity {
    const { id, props } = this.toDomainProps(ormEntities[0] as unknown as OrmEntity);
    const ormEntityBase: TypeormEntityBase = ormEntities[0] as unknown as TypeormEntityBase;
    return new this.entityConstructor({
      id,
      props,
      isActive: ormEntityBase.isActive,
    });
  }

  toOrmEntity(entity: Entity): OrmEntity {
    const props = this.toOrmProps(entity);
    return new this.ormEntityConstructor({
      ...props,
      id: entity.id.value,
      isActive: entity.isActive,
    });
  }
}
