import {
  IsNotEmpty,
  IsBoolean,
  IsInt,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationsDto {
  @ApiProperty({
    description: 'Conteúdo da notificação',
    example: 'Notificação Criada!',
  })
  @IsNotEmpty({ message: 'A mensagem da notificação é obrigatória.' })
  @IsString({ message: 'A mensagem deve ser um texto.' })
  message: string;

  @ApiProperty({
    description: 'ID do cliente que vai receber a notificação',
    example: 1,
  })
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório.' })
  @IsInt({ message: 'O ID do cliente deve ser um número inteiro.' })
  client_id: number;

  @ApiProperty({
    description: 'Define se a notificação já foi lida ou não',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo "is_read" deve ser verdadeiro ou falso.' })
  is_read?: boolean;
}
