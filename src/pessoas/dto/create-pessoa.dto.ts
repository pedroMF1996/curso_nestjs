import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreatePessoaDto {
  @IsEmail()
  email: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @MaxLength(100)
  @IsNotEmpty()
  nome: string;
}
