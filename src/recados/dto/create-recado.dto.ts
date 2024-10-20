import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRecadoDto {
  @IsString({
    message: 'Texto deve ser do tipo string',
  })
  @IsNotEmpty()
  @MinLength(2)
  readonly texto: string;

  @IsNotEmpty()
  readonly deId: number;
  @IsNotEmpty()
  readonly paraId: number;
}
