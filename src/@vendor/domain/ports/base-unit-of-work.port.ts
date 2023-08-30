export interface BaseUnitOfWorkPort {
  execute<T>(
    correlationId: string,
    callback: () => Promise<T>,
    options?: UnitOfWorkOptions,
    afterRollback?: () => Promise<T>,
  ): Promise<T>;
}

export interface UnitOfWorkOptions {
  isolationLevel?: 'READ UNCOMMITTED' | 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE';
  replicationMode?: 'master' | 'slave';
}
