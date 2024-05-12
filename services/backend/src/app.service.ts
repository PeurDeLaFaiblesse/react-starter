import { LoggerMiddleware } from '@/logger/logger.middleware';
import configuration from '@config/configuration';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaywrightModule } from 'nestjs-playwright';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PlaywrightModule.forRoot({
      headless: true,
      channel: 'chromium',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: {
        index: false,
      },
      renderPath: 'static',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConf = configService.get('database');
        return {
          type: 'postgres',
          host: dbConf.host,
          port: dbConf.port,
          username: dbConf.username,
          password: dbConf.password,
          database: dbConf.db_name,
          entities: ['src/**/*.entities{.ts,.js}'],
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
