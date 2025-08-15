import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ClientRole {
  CLIENT = 'client',
  ADMIN = 'admin',
}

export class RegisterClientDto {
  @ApiProperty({ description: 'Nome do cliente', example: 'João Silva' })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'cliente@example.com',
  })
  @IsEmail({}, { message: 'Digite um email válido' })
  email: string;

  @ApiProperty({ description: 'Senha do cliente', example: '123456' })
  @IsString({ message: 'A Senha precisa ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;

  @ApiPropertyOptional({
    description: 'Role do cliente (opcional)',
    example: ClientRole.CLIENT,
    enum: ClientRole,
  })
  @IsOptional()
  @IsEnum(ClientRole, { message: 'Role must be CLIENT or ADMIN' })
  role?: ClientRole = ClientRole.CLIENT;
}
