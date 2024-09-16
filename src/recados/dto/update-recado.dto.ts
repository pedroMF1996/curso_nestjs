import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDto } from './create-recado.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateReadDto extends PartialType(CreateRecadoDto) {
  @IsOptional()
  @IsBoolean()
  readonly lido?: boolean;
}
