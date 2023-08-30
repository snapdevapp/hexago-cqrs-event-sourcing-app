/*  Most of repositories will probably need generic 
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific interfaces should be defined
    in a respective module/use case.
*/

import { BaseEntityProps } from '../base-classes/entity.base';
import { DeepPartial } from '../types';
import { ID } from '../value-objects/id.value-object';

export type QueryParams<EntityProps> = DeepPartial<BaseEntityProps & EntityProps>;

export interface Save<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface SaveMany<Entity> {
  saveMany(entities: Entity[]): Promise<Entity[]>;
}

export interface FindOne<Entity, EntityProps> {
  findOneOrThrow(params: QueryParams<EntityProps>): Promise<Entity>;
}

export interface FindOneById<Entity> {
  findOneByIdOrThrow(id: ID | string): Promise<Entity>;
}

export interface FindMany<Entity, EntityProps> {
  findMany(params: QueryParams<EntityProps>): Promise<Entity[]>;
}

export type FindOptionsOrderValue =
  | 'ASC'
  | 'DESC'
  | 'asc'
  | 'desc'
  | 1
  | -1
  | {
      direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
      nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
    };

export type OrderBy<Entity> = {
  [P in keyof Entity]?: Partial<Entity>;
};

export interface PaginationMeta {
  skip?: number;
  limit?: number;
  page?: number;
}

export interface FindManyPaginatedParams<EntityProps> {
  params?: QueryParams<EntityProps>;
  pagination?: PaginationMeta;
  orderBy?: OrderBy<EntityProps>;
}

export interface DataWithPaginationMeta<T> {
  data: T;
  count: number;
  limit?: number;
  page?: number;
}

export interface FindManyPaginated<Entity, EntityProps> {
  findManyPaginated(options: FindManyPaginatedParams<EntityProps>): Promise<DataWithPaginationMeta<Entity[]>>;
}

export interface DeleteOne<Entity> {
  delete(entity: Entity): Promise<Entity>;
}

export interface QueryOptions {
  lock:
    | 'pessimistic_read'
    | 'pessimistic_write'
    | 'dirty_read'
    | 'pessimistic_partial_write'
    | 'pessimistic_write_or_fail'
    | 'for_no_key_update';
}

export interface RepositoryPort<Entity, EntityProps>
  extends Save<Entity>,
    FindOne<Entity, EntityProps>,
    FindOneById<Entity>,
    FindMany<Entity, EntityProps>,
    FindManyPaginated<Entity, EntityProps>,
    DeleteOne<Entity>,
    SaveMany<Entity> {
  setCorrelationId(correlationId: string): this;
  withRelations(relations: Array<string>): this;
}
