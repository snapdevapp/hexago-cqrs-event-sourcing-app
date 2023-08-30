import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from '@vendor/domain/ports';
import { TypeormRepositoryBase, WhereCondition } from '@vendor/infrastructure/database/typeorm.repository.base';

import { SettingRepositoryPort } from '@modules/onboarding/core/application/ports';
import { SettingEntity, SettingProps } from '@modules/onboarding/core/domain/entities';
import { SettingOrmEntity } from '@modules/onboarding/infrastructure/persistence/orm-entities';
import { SettingOrmMapper } from '@modules/onboarding/infrastructure/persistence/orm-mappers';

export class SettingRepository
  extends TypeormRepositoryBase<SettingEntity, SettingProps, SettingOrmEntity>
  implements SettingRepositoryPort
{
  protected relations: string[];

  constructor(
    @InjectRepository(SettingOrmEntity)
    private readonly ormEntityRepository: Repository<SettingOrmEntity>,
  ) {
    super(
      ormEntityRepository,
      new SettingOrmMapper(SettingEntity, SettingOrmEntity),
      new Logger(SettingRepository.name),
    );
  }

  async findSettingById(settingId: string): Promise<SettingEntity | undefined> {
    const settingOrmEntity = await this.ormEntityRepository.findOne({
      where: { settingId },
    });

    return this.mapper.toDomainEntity(settingOrmEntity);
  }

  protected prepareQuery(params: QueryParams<SettingProps>): WhereCondition<SettingOrmEntity> {
    const where: QueryParams<SettingOrmEntity> = {};
    if (params.settingId) {
      where.settingId = params.settingId;
    }
    return where;
  }
}
