import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisCacheError } from '@/redisCache/redisError';
import { RedisKey } from '@/redisCache/dto/redisKey.dto';
import { RedisReturnType } from '@/redisCache/dto/redisReturnType.dto';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: RedisKey): Promise<RedisReturnType> {
    return this.processValue(await this.cache.get(this.getKey(key)));
  }

  async set(key: RedisKey, value: RedisReturnType) {
    await this.cache.set(this.getKey(key), this.processValueToString(value));
  }

  async cached<T>(userKey: RedisKey, fn: () => T): Promise<T> {
    const redisValue: string = await this.get(userKey);
    if (redisValue) {
      return JSON.parse(redisValue);
    }

    const fnResult = await Promise.resolve(fn()).catch(() => {
      throw new RedisCacheError();
    });

    await this.set(userKey, JSON.stringify(fnResult));
    return fnResult;
  }

  getKey(userKey: RedisKey): string {
    const { tag, ...key } = userKey;
    return (tag ? `${tag}:` : '') + JSON.stringify(key);
  }

  private processValue(val: string): RedisReturnType {
    const NULL_STRING = 'REDIS_NULL';

    if (val === NULL_STRING) {
      return null;
    }

    return val;
  }

  private processValueToString(val: RedisReturnType): string {
    const NULL_STRING = 'REDIS_NULL';

    if (val === null) {
      return NULL_STRING;
    }

    return val;
  }
}
