import { ConfigService } from '@vendor/infrastructure/config/config.service';
import { CacheEvents, CachePort } from '@vendor/domain/ports/cache.port';
import { Injectable } from '@nestjs/common';
import IoRedis from 'ioredis';
import { CacheContainer } from 'node-ts-cache';
import { IoRedisStorage } from 'node-ts-cache-storage-ioredis';

@Injectable()
export class CacheService implements CachePort {
  private cache: CacheContainer;

  constructor(private readonly configService: ConfigService) {
    const ioRedisInstance = new IoRedis({
      port: parseInt(this.configService.get('REDIS_PORT') ?? '6379', 10),
      host: this.configService.get('REDIS_HOST'),
      family: 4,
      db: 0,
    });
    this.cache = new CacheContainer(new IoRedisStorage(ioRedisInstance));
  }

  /**
   * Put key.
   *
   * @param key
   * @param value
   * @param ttl
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cache.setItem(key, value, {
      ttl,
    });
  }

  /**
   * Get key.
   *
   * @param key
   */
  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.getItem<T>(key);
  }

  /**
   * Has method.
   * @param key
   */
  async has(key: string): Promise<boolean> {
    return !!(await this.get(key));
  }

  /**
   * Create cacheKey.
   * @param event
   * @param clientId
   */
  generateCacheKey(event: CacheEvents, clientId: string): string {
    return `${event}-${clientId}`;
  }
}
