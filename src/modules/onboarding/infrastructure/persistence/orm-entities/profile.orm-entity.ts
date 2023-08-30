import { Column, Entity, Unique } from 'typeorm';
import { TypeormEntityBase } from '@vendor/infrastructure/database/typeorm.entity.base';

export interface ProfileDocumentObject {
  // eslint-disable-next-line camelcase
  back_page?: string;

  // eslint-disable-next-line camelcase
  front_page?: string;
}

export enum ProfileStatus {
  AWAITING_DATA = 'awaiting_data',
  AWAITING_APPROVAL = 'awaiting_approval',
  COMPLETE = 'complete',
  REJECTED = 'rejected',
  UNVERIFIED = 'unverified',
  SUSPECTED = 'suspected',
}

export enum KYCStatus {
  CLEAR = 'clear',
  REJECTED = 'rejected',
  SUSPECTED = 'suspected',
  CAUTION = 'caution',
  PENDING = 'pending',
}

@Entity('profile')
@Unique(['email'])
export class ProfileOrmEntity extends TypeormEntityBase {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  photo?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  activity: string;

  @Column({ nullable: true })
  monthlyIncome: string;

  @Column({ nullable: true })
  homeLocation?: string;

  @Column({
    nullable: true,
    enum: ProfileStatus,
    default: ProfileStatus.AWAITING_DATA,
  })
  status?: ProfileStatus;

  @Column('json', { nullable: true })
  document?: ProfileDocumentObject;

  @Column({
    enum: KYCStatus,
    default: KYCStatus.PENDING,
  })
  profileVerificationStatus?: KYCStatus;

  public constructor(init?: Partial<ProfileOrmEntity>) {
    super();
    Object.assign(this, init);
  }
}
