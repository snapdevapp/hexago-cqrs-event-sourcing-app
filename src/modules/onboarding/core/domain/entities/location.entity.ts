import { AggregateRoot } from '@vendor/domain/base-classes/aggregate-root.base';
import { ArgumentNotProvidedException } from '@vendor/domain/exception';
import { UUID } from '@vendor/domain/value-objects/uuid.value-object';

export interface LocationProps {
  name: string;
}

export class LocationEntity extends AggregateRoot<LocationProps> {
  protected readonly _id: UUID;

  get name(): string {
    return this.props.name;
  }

  validate(): void {
    if (this.props === undefined) throw new ArgumentNotProvidedException('props are needed');
    // TODO: validate other props
    // entity business rules validation to protect it's invariant
  }
}
