import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { MyExceptionFilter } from 'src/common/filters/exception.fitlter';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { PipeIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './app.config';
import * as joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      // envFilePath: 'envs/.env',
      validationSchema: joi.object({
        DB_HOST: joi.required(),
        DB_PORT: joi.number().default(5432),
        DB_USERNAME: joi.required(),
        DB_PASSWORD: joi.required(),
        DB_DATABASE: joi.required(),
        DB_AUTO_LOAD_ENTITIES: joi.number().min(0).max(1),
        DB_SSL_REJECT_UNAUTHORIZED: joi.required(),
        DB_SYNCHRONIZE: joi.number().min(0).max(1),
        DB_LOGGING: joi.number().min(0).max(1),
      }),
      // ignoreEnvFile: true, //Quando nao se tem necessidade de se ter um arquivo .env no servidor
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get<'postgres'>('dataBase.type'),
          host: configService.get<string>('dataBase.host'),
          port: configService.get<number>('dataBase.port'), // Porta padrão do PostgreSQL
          username: configService.get<string>('dataBase.username'),
          password: configService.get<string>('dataBase.password'),
          database: configService.get<string>('dataBase.database'),
          autoLoadEntities: configService.get<boolean>(
            'dataBase.autoLoadEntities',
          ), //Carrega entidades sem precisar especificalas
          ssl: {
            rejectUnauthorized: configService.get<boolean>(
              'dataBase.ssl.rejectUnauthorized',
            ), // Configuração para aceitar SSL sem verificação de certificado
          },
          synchronize: configService.get<boolean>('dataBase.synchronize'), // Definir para false em produção
          logging: configService.get<boolean>('dataBase.logging'), // Log de consultas SQL
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT), // Porta padrão do PostgreSQL
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES), //Carrega entidades sem precisar especificalas
    //   ssl: {
    //     rejectUnauthorized: Boolean(process.env.DB_SSL_REJECT_UNAUTHORIZED), // Configuração para aceitar SSL sem verificação de certificado
    //   },
    //   synchronize: Boolean(process.env.DB_SYNCHRONIZE), // Definir para false em produção
    //   logging: Boolean(process.env.DB_LOGGING), // Log de consultas SQL
    // }),
    PessoasModule,
    RecadosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: MyExceptionFilter },
    { provide: APP_PIPE, useClass: PipeIntIdPipe },
    { provide: APP_GUARD, useClass: IsAdminGuard },
  ],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: 'recados',
      method: RequestMethod.ALL,
    });
  }
}
