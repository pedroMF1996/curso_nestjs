import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
// import { SimpleMiddleware } from './common/middlewares/simple.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(SimpleMiddleware);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true /**Remove chaves que nao estao mapeadas no dto */,
      forbidNonWhitelisted: true /**Levantar erro quando a chave nao existir */,
      transform:
        true /*Tenta transformar os tipos de dados de parametros e dtos */,
    }),
  );

  // app.useGlobalFilters(new MyExceptionFilter());
  await app.listen(3000);
}
bootstrap();
