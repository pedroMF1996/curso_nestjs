import { Controller, Get } from '@nestjs/common';
import { ConteitosAutomaticoService } from './conteitos-automatico.service';

@Controller('conteitos-automatico')
export class ConteitosAutomaticoController {
  constructor(
    private readonly conteitosAutomaticoService: ConteitosAutomaticoService,
  ) {}
  @Get()
  home(): string {
    return 'ConceitosAutomatico';
  }

  @Get()
  teste() {
    return this.conteitosAutomaticoService.teste();
  }
}
