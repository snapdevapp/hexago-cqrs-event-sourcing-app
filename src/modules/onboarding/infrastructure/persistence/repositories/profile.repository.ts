import { Repository } from 'typeorm';

import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryParams } from '@libs/domain/ports/repository.port';
import { TypeormRepositoryBase, WhereCondition } from '@libs/infrastructure/database/typeorm.repository.base';

import { ProfileRepositoryPort } from '@modules/onboarding/core/application/ports/profile.repository.port';
import { ProfileEntity, ProfileProps } from '@modules/onboarding/core/domain/entities/profile.entity';
import { ClientOrmEntity } from '@modules/onboarding/infrastructure/persistence/orm-entities';
import { ProfileOrmEntity } from '@modules/onboarding/infrastructure/persistence/orm-entities/profile.orm-entity';
import { ProfileOrmMapper } from '@modules/onboarding/infrastructure/persistence/orm-mappers/profile.orm-mapper';

export class ProfileRepository
  extends TypeormRepositoryBase<ProfileEntity, ProfileProps, ProfileOrmEntity>
  implements ProfileRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(ClientOrmEntity)
    private readonly profileOrmRepository: Repository<ProfileOrmEntity>,
  ) {
    super(
      profileOrmRepository,
      new ProfileOrmMapper(ProfileEntity, ProfileOrmEntity),
      new Logger(ProfileRepository.name),
    );
  }

  async findProfileById(id: string): Promise<ProfileEntity | undefined> {
    const profile = await this.profileOrmRepository.findOne({
      select: [
        'id',
        'isActive',
        'email',
        'dateOfBirth',
        'firstName',
        'lastName',
        'lastName',
        'monthlyIncome',
        'activity',
        'status',
        'photo',
        'gender',
      ],
      where: { id },
    });

    if (!profile) return undefined;

    return this.mapper.toDomainEntity(profile);
  }

  protected prepareQuery(params: QueryParams<ProfileProps>): WhereCondition<ProfileOrmEntity> {
    const where: QueryParams<ClientOrmEntity> = {};

    if (params.id) {
      where.id = params.id.value;
    }

    return where;
  }
}
