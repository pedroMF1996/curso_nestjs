import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  jwt: {},
  dataBase: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // Porta padrão do PostgreSQL
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES), //Carrega entidades sem precisar especificalas
    ssl: {
      rejectUnauthorized: Boolean(process.env.DB_SSL_REJECT_UNAUTHORIZED), // Configuração para aceitar SSL sem verificação de certificado
    },
    synchronize: Boolean(process.env.DB_SYNCHRONIZE), // Definir para false em produção
    logging: Boolean(process.env.DB_LOGGING), // Log de consultas SQL
  },
  environment: process.env.NodeEnv || 'development',
}));

export const recadosConfig = registerAs('recadosConfig', () => ({
  teste1: 'valor1',
  teste2: 'valor2',
}));
