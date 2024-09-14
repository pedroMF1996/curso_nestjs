import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosManualModule } from 'src/conceitos-manual/conceitos-manual.module';
import { ConteitosAutomaticoModule } from 'src/conteitos-automatico/conteitos-automatico.module';
import { RecadosModule } from 'src/recados/recados.module';

@Module({
  imports: [ConceitosManualModule, ConteitosAutomaticoModule, RecadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
