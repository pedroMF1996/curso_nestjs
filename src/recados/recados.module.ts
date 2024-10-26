import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadoEntity } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils, RecadosUtilsMock } from 'src/common/utils/recados-utils';
import { OnlyLowerCaseLettersRegex } from 'src/common/utils/regex/only-lowercaseletters.regex copy';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
} from 'src/common/constants/recados.constants';
import { RegexFactory } from 'src/common/utils/regex/regex.factory';
import { MyDynamicModule } from 'src/my-dynamic/my-dynamic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecadoEntity]),
    PessoasModule,
    MyDynamicModule.forRoot({ apiKey: 'aqui vem a API key', apiUrl: 'url' }),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils,
      // useClass: RecadosUtils
      useValue: new RecadosUtilsMock(),
    },
    {
      provide: 'SERVER_NAME',
      useValue: 'My name is NestJS',
    },
    RegexFactory,
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX,
      useClass: OnlyLowerCaseLettersRegex,
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useFactory: async (rF: RegexFactory) => {
        await new Promise(res => setTimeout(res, 3000));
        return rF.create(REMOVE_SPACES_REGEX);
      },
      inject: [RegexFactory],
    },
  ],
})
export class RecadosModule {}
