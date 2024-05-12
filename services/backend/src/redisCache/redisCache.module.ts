import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { RedisCacheService } from '@/redisCache/redisCache.service';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const redisConf = configService.get('redis');
        const store: CacheStore = (await redisStore({
          ttl: redisConf.ttl,
          url: redisConf.url,
          password: redisConf.password,
        }).catch((e) => {
          console.error('Redis is not connected');
          throw e;
        })) as any;

        return { store };
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
