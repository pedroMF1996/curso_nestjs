import { Module } from '@nestjs/common';
import { ConteitosAutomaticoController } from './conteitos-automatico.controller';

@Module({
  controllers: [ConteitosAutomaticoController],
})
export class ConteitosAutomaticoModule {}
