import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { TypeormEntityBase } from '@vendor/infrastructure/database/typeorm.entity.base';

@Entity('client')
export class ClientOrmEntity extends TypeormEntityBase {
  @Column({ nullable: true })
  @Exclude()
  fcmDeviceToken?: string;

  /**
   * Client entity constructor.
   *
   * @param init
   */
  public constructor(init?: Partial<ClientOrmEntity>) {
    super();
    Object.assign(this, init);
  }
}

export type ClientView = {
  id: string;
  isActive: boolean;
  clientFcmDeviceToken: string;
  clientIsActive: boolean;
  profileId: string;
  profileFirstName: string;
  profileLastName: string;
  profileDateOfBirth: Date;
  profileEmail: string;
  profileIsActive: boolean;
  profilePhoto: string;
  profileStatus: string;
  phoneNumberId: string;
  phoneNumberIsActive: boolean;
  phoneNumberE164: string;
  countryId: string;
  countryIsoCode: string;
  countryIsActive: boolean;
  activity: string;
  monthlyIncome: string;
};
