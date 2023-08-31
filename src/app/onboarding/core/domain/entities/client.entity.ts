import { AggregateRoot } from '@vendor/domain/aggregate-root.base';
import { ArgumentNotProvidedException } from '@vendor/domain/exception';
import { UUID } from '@vendor/domain/value-objects/uuid.value-object';

export interface ClientProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  pushToken?: string;
  dateOfBirth?: Date;
  countryIsoCode?: string;
  photoUrl?: string;
  kycStatus?: string;
  monthlyIncome?: string;
  activity?: string;
  gender?: string;
}

export class ClientEntity extends AggregateRoot<ClientProps> {
  protected readonly _id: UUID;

  validate(): void {
    if (this.props === undefined) {
      throw new ArgumentNotProvidedException('props are needed');
    }
  }

  get kycStatus(): string {
    return this.props.kycStatus;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get pushToken(): string {
    return this.props.pushToken;
  }

  get photoUrl(): string {
    return this.props.photoUrl;
  }

  get dateOfBirth(): Date {
    return this.props.dateOfBirth;
  }

  get countryIsoCode(): string {
    return this.props.countryIsoCode;
  }

  get activity(): string {
    return this.props.activity;
  }

  get monthlyIncome(): string {
    return this.props.monthlyIncome;
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
