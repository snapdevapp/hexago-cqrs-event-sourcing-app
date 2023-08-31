import { Column, Entity } from 'typeorm';
import { TypeormEntityBase } from '@vendor/infrastructure/database/typeorm.entity.base';

@Entity('client')
export class ClientOrmEntity extends TypeormEntityBase {
  public constructor(init?: Partial<ClientOrmEntity>) {
    super();
    Object.assign(this, init);
  }

  @Column({ name: 'firstname' })
  firstName: string;

  @Column({ name: 'lastname' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: string;
}

export type ClientView = {
  id: string;
  isActive: boolean;
  lastName: string;
  firstName: string;
  email: string;
  gender: string;
};
