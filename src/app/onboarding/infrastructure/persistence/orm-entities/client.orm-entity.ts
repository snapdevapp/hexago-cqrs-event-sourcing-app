import { Column, Entity } from 'typeorm';
import { TypeormEntityBase } from '@vendor/infrastructure/database/typeorm.entity.base';

@Entity('client')
export class ClientOrmEntity extends TypeormEntityBase {
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
  lastName: string;
  firstName: string;
  email: string;
  monthlyIncome: string;
};
