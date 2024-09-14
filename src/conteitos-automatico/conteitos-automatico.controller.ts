import { Controller, Get } from '@nestjs/common';

@Controller('conteitos-automatico')
export class ConteitosAutomaticoController {
  @Get()
  home(): string {
    return 'ConceitosAutomatico';
  }
}
