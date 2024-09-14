import { Module } from '@nestjs/common';
import { ConteitosAutomaticoController } from './conteitos-automatico.controller';
import { ConteitosAutomaticoService } from './conteitos-automatico.service';

@Module({
  controllers: [ConteitosAutomaticoController],
  providers: [ConteitosAutomaticoService],
})
export class ConteitosAutomaticoModule {}
