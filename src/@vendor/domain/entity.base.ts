import { ArgumentNotProvidedException, ArgumentInvalidException, ArgumentOutOfRangeException } from './exception';
import { Guard } from './guards/guard';
import { convertPropsToObject } from './utils';
import { ID } from './value-objects/id.value-object';

export interface BaseEntityProps {
  id: ID;
  isActive?: boolean;
}

export interface CreateEntityProps<T> {
  id: ID;
  isActive?: boolean;
  props: T;
}

export abstract class Entity<EntityProps> {
  constructor({ id, isActive, props }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    this.validateProps(props);
    this._isActive = isActive || true;
    this.props = props;
    this.validate();
  }

  protected props: EntityProps;

  // ID is set in the entity to support different ID types
  protected abstract _id: ID;

  private readonly _isActive: boolean;

  get id(): ID {
    return this._id;
  }

  private setId(id: ID): void {
    this._id = id;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  /**
   *  Check if two entities are the same Entity. Checks using ID field.
   * @param object Entity
   */
  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id.equals(object.id) : false;
  }

  /**
   * Returns current **copy** of entity's props.
   * Modifying entity's state won't change previously created
   * copy returned by this method since it doesn't return a reference.
   * If a reference to a specific property is needed create a getter in parent class.
   *
   * @return {*}  {Props & EntityProps}
   * @memberof Entity
   */
  public getPropsCopy(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  /**
   * Convert an Entity and all sub-entities/Value Objects it
   * contains to a plain object with primitive types. Can be
   * useful when logging an entity during testing/debugging
   */
  public toObject(): unknown {
    const plainProps = convertPropsToObject(this.props);

    const result = {
      id: this._id.value,
      ...plainProps,
    };
    return Object.freeze(result);
  }

  /**
   * Validate invariant
   */
  public abstract validate(): void;

  private validateProps(props: EntityProps): void {
    const maxProps = 50;

    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('Entity props should not be empty');
    }
    if (typeof props !== 'object') {
      throw new ArgumentInvalidException('Entity props should be an object');
    }
    if (Object.keys(props).length > maxProps) {
      throw new ArgumentOutOfRangeException(`Entity props should not have more than ${maxProps} properties`);
    }
  }
}
