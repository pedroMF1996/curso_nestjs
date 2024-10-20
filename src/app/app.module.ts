import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-floral-night-a5qu3qbi.us-east-2.aws.neon.tech',
      port: 5432, // Porta padrão do PostgreSQL
      username: 'nestdb_owner',
      password: 'fNq5TnZX9xzj',
      database: 'nestdb',
      autoLoadEntities: true, //Carrega entidades sem precisar especificalas
      ssl: {
        rejectUnauthorized: false, // Configuração para aceitar SSL sem verificação de certificado
      },
      synchronize: true, // Definir para false em produção
      logging: true, // Log de consultas SQL
    }),
    PessoasModule,
    RecadosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
