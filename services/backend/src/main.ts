import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { QueryFailedExceptionFilter } from '@/filter/QueryFailedErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const http = configService.get('http');

  const config = new DocumentBuilder().setTitle('Spiders').setVersion('0.1').build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  SwaggerModule.setup('api', app, document);
  console.log('app started at ' + http.port + ' port.');
  await app.listen(http.port);
}
bootstrap();
