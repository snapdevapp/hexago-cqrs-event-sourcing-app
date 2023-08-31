import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormRepositoryBase } from '@vendor/infrastructure/database/typeorm.repository.base';
import { ClientEntity, ClientProps } from '@src/app/onboarding/core/domain/entities';
import { ClientOrmEntity } from '@src/app/onboarding/infrastructure/persistence/orm-entities';
import { ClientOrmMapper } from '@src/app/onboarding/infrastructure/persistence/orm-mappers';
import { ClientRepositoryPort } from '@src/app/onboarding/core/application/ports';
import { QueryParams } from '@vendor/domain/ports/repository.port';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NotFoundException } from '@vendor/domain/exception';
import { LoggerAdapter } from '@vendor/infrastructure/adapters';

@Injectable()
export class ClientRepository
  extends TypeormRepositoryBase<ClientEntity, ClientProps, ClientOrmEntity>
  implements ClientRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(ClientOrmEntity)
    private readonly clientOrmRepository: Repository<ClientOrmEntity>,
  ) {
    super(
      clientOrmRepository,
      new ClientOrmMapper(ClientEntity, ClientOrmEntity),
      new LoggerAdapter(ClientRepository.name),
    );
  }

  async findClient(clientId: string): Promise<ClientEntity | undefined> {
    const result = await this.clientOrmRepository.createQueryBuilder('c').where({ id: clientId }).getOne();

    if (result !== null) {
      return this.mapper.toDomainEntity(result);
    }

    throw new NotFoundException(`The client ${clientId} is not found`);
  }

  protected prepareQuery(
    params: QueryParams<ClientProps>,
  ): FindOptionsWhere<ClientOrmEntity>[] | FindOptionsWhere<ClientOrmEntity> {
    const where: FindOptionsWhere<ClientOrmEntity> = {};

    if (params.id) {
      where.id = params.id.value;
    }

    return where;
  }
}
