export interface CachePort {
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  get<T>(key: string): Promise<T | undefined>;
  has(key: string): Promise<boolean>;
  generateCacheKey(event: CacheEvents, clientId: string): string;
}

export type CacheEvents = 'TRANSACTION_LIST_REFRESHED' | 'ACCOUNT_BALANCE_REFRESHED' | 'DEPOSIT';
export interface LastRefreshEventCached {
  completedAt: Date;
  event: CacheEvents;
}
