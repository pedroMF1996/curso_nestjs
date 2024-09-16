import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRecadoDto {
  @IsString({
    message: 'Texto deve ser do tipo string',
  })
  @IsNotEmpty()
  @MinLength(2)
  readonly texto: string;
  @IsString({
    message: 'De deve ser do tipo string',
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly de: string;

  @IsString({
    message: 'Para deve ser do tipo string',
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly para: string;
}
