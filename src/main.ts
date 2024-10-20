import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true /**Remove chaves que nao estao mapeadas no dto */,
      forbidNonWhitelisted: true /**Levantar erro quando a chave nao existir */,
      transform:
        true /*Tenta transformar os tipos de dados de parametros e dtos */,
    }),
  );
  await app.listen(3000);
}
bootstrap();
