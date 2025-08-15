import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterBarberDto {
  @ApiProperty({
    description: 'CPF do barbeiro, deve conter 11 números',
    example: '12345678901',
  })
  @IsString({ message: 'O CPF deve ser um texto' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @Matches(/^\d{11}$/, { message: 'O CPF deve ter 11 números' })
  cpf: string;

  @ApiProperty({ description: 'Nome do barbeiro', example: 'João Silva' })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'Idade do barbeiro',
    example: 25,
    minimum: 18,
    maximum: 99,
  })
  @IsNumber({}, { message: 'A idade deve ser um número' })
  @Min(18, { message: 'A idade mínima é 18 anos' })
  @Max(99, { message: 'A idade máxima é 99 anos' })
  age: number;

  @ApiProperty({ description: 'ID da especialidade do barbeiro', example: 1 })
  @IsNumber({}, { message: 'Informe a especialidade' })
  specialtyId: number;

  @ApiProperty({
    description: 'Data de contratação do barbeiro',
    example: '2025-08-14T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty({ message: 'A data de contratação não pode estar vazia' })
  @IsDate({ message: 'A data de contratação deve ser uma data válida' })
  @Type(() => Date)
  accounting_data: Date;
}
