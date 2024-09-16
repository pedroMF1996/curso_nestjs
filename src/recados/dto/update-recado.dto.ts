import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDto } from './create-recado.dto';

export class UpdateReadDto extends PartialType(CreateRecadoDto) {}
