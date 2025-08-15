import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBarberDto {
  @ApiProperty({
    description: 'CPF do barbeiro, deve conter 11 números',
    example: '12345678901',
  })
  @IsString({ message: 'O CPF deve ser um texto' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @Matches(/^\d{11}$/, { message: 'O CPF deve ter 11 números' })
  cpf: string;

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
