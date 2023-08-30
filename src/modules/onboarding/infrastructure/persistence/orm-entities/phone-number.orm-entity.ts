import { TypeormEntityBase } from '@vendor/infrastructure/database/typeorm.entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CountryOrmEntity } from './country.orm-entity';

@Entity('phone_number')
export class PhoneNumberOrmEntity extends TypeormEntityBase {
  @Column({ nullable: true })
  msisdn?: string;

  @Column({ nullable: false, unique: true })
  e164: string;

  @ManyToOne(() => CountryOrmEntity, {
    eager: false,
    onDelete: 'SET NULL',
    cascade: true,
  })
  country: CountryOrmEntity;

  public constructor(init?: Partial<PhoneNumberOrmEntity>) {
    super();
    Object.assign(this, init);
  }
}
