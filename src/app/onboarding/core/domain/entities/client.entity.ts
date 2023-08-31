import { AggregateRoot } from '@vendor/domain/aggregate-root.base';
import { ArgumentNotProvidedException } from '@vendor/domain/exception';
import { UUID } from '@vendor/domain/value-objects/uuid.value-object';

export interface ClientProps {
  isActive?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
}

export class ClientEntity extends AggregateRoot<ClientProps> {
  protected readonly _id: UUID;

  validate(): void {
    if (this.props === undefined) {
      throw new ArgumentNotProvidedException('props are needed');
    }
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get email(): string {
    return this.props.email;
  }

  get gender(): string {
    return this.props.gender;
  }

  static rehydrateIdAndProps(id: string, props: ClientProps): ClientEntity {
    return new ClientEntity({ id: new UUID(id), props });
  }

  static create(props: ClientProps): ClientEntity {
    return new ClientEntity({ id: UUID.generate(), props });
  }
}
