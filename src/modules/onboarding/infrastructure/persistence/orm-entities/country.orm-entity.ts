import { TypeormEntityBase } from '@vendor/infrastructure/database/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('country')
export class CountryOrmEntity extends TypeormEntityBase {
  @Column({ nullable: false, unique: true })
  isoCode: string;

  public constructor(init?: Partial<CountryOrmEntity>) {
    super();
    Object.assign(this, init);
  }
}
