import { AggregateRoot } from '@vendor/domain/base-classes/aggregate-root.base';
import { ArgumentNotProvidedException } from '@vendor/domain/exception';
import { UUID } from '@vendor/domain/value-objects/uuid.value-object';

import {
  KYCStatus,
  ProfileDocumentObject,
  ProfileStatus,
} from '@modules/onboarding/infrastructure/persistence/orm-entities';

export interface ProfileProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  photoUrl?: string;
  profileStatus?: ProfileStatus;
  monthlyIncome?: string;
  activity?: string;
  gender?: string;
  documentType?: string;
  profileVerificationStatus?: KYCStatus;
  document?: ProfileDocumentObject;
  homeLocation?: string;
}

export class ProfileEntity extends AggregateRoot<ProfileProps> {
  protected readonly _id: UUID;

  validate(): void {
    if (this.props === undefined) throw new ArgumentNotProvidedException('props are needed');
    // TODO: validate other props
    // entity business rules validation to protect it's invariant
  }

  get kycStatus(): string {
    return this.props.profileStatus;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get photoUrl(): string {
    return this.props.photoUrl;
  }

  get dateOfBirth(): Date {
    return this.props.dateOfBirth;
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

  get documentType(): string {
    return this.props.documentType;
  }

  static rehydrateFromIdAndProps(id: string, props: ProfileProps): ProfileEntity {
    const newProps: ProfileProps = {
      ...props,
    };
    return new ProfileEntity({ id: new UUID(id), props: newProps });
  }

  updateProfile(args: Partial<ProfileProps>): void {
    this.props = { ...this.props, ...args };
  }
}
