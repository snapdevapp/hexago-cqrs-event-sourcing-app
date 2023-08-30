import { Exclude } from 'class-transformer';
import { Column, Entity, Unique } from 'typeorm';
import { TypeormEntityBase } from '@vendor/infrastructure/database/typeorm.entity.base';

@Entity('setting')
@Unique(['settingId'])
export class SettingOrmEntity extends TypeormEntityBase {
  @Column({ nullable: false })
  @Exclude()
  label: string;

  @Column({ nullable: false })
  settingId: string;

  @Column({ nullable: true })
  value?: string;

  @Column('json', { nullable: true, default: {} })
  config?: never;

  public constructor(init?: Partial<SettingOrmEntity>) {
    super();
    Object.assign(this, init);
  }
}
