import { LoggerMiddleware } from '@/logger/logger.middleware';
import configuration from '@config/configuration';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaywrightModule } from 'nestjs-playwright';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // @TODO: разобраться что не так
    // PlaywrightModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const { headless, channel, isGlobal } = configService.get('playwright') || {};

    //     return {
    //       launchOptions: {
    //         headless,
    //         channel,
    //         isGlobal,
    //       },
    //       instanceName: 'test-chrome',
    //     };
    //   },
    // }),
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
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
