import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosManualModule } from 'src/conceitos-manual/conceitos-manual.module';
import { ConteitosAutomaticoModule } from 'src/conteitos-automatico/conteitos-automatico.module';

@Module({
  imports: [ConceitosManualModule, ConteitosAutomaticoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
