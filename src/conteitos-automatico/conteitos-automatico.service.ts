import { Injectable } from '@nestjs/common';

@Injectable()
export class ConteitosAutomaticoService {
  teste(): string {
    return 'teste automatico';
  }
}
