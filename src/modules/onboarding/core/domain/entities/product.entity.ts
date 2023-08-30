import { AggregateRoot } from '@vendor/domain/base-classes/aggregate-root.base';
import { ArgumentNotProvidedException } from '@vendor/domain/exception';
import { UUID } from '@vendor/domain/value-objects/uuid.value-object';

export interface ProductProps {
  name: string;
  identifier: string;
}

export class ProductEntity extends AggregateRoot<ProductProps> {
  protected readonly _id: UUID;

  get name(): string {
    return this.props.name;
  }

  get identifier(): string {
    return this.props.identifier;
  }

  validate(): void {
    if (this.props === undefined) throw new ArgumentNotProvidedException('props are needed');
    // TODO: validate other props
    // entity business rules validation to protect it's invariant
  }
}
