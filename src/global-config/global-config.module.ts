import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, recadosConfig } from './global.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
})
export class GlobalConfigModule {}
