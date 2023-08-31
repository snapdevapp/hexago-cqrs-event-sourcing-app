import { Column, Entity } from 'typeorm';
import { TypeormEntityBase } from '@vendor/infrastructure/database/typeorm.entity.base';

@Entity('client')
export class ClientOrmEntity extends TypeormEntityBase {
  public constructor(init?: Partial<ClientOrmEntity>) {
    super();
    Object.assign(this, init);
  }

  @Column({ name: 'firtname', type: 'varchar' })
  firtName: string;

  @Column({ name: 'lastname', type: 'varchar' })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;
}

export type ClientView = {
  id: string;
  isActive: boolean;
  lastName: string;
  firstName: string;
  email: string;
};
