import { ApiProperty } from '@nestjs/swagger';

export class NotificationResponseDto {
  @ApiProperty({ example: 1, description: 'ID da notificação gerada' })
  id: number;

  @ApiProperty({ example: 5, description: 'ID do cliente' })
  client_id: number;

  @ApiProperty({
    example: 'Seu agendamento foi confirmado!',
    description: 'Mensagem da notificação',
  })
  message: string;

  @ApiProperty({
    example: false,
    description: 'Se a notificação já foi lida ou não',
  })
  is_read: boolean;

  @ApiProperty({
    example: '2025-08-17T10:00:00.000Z',
    description: 'Data de criação da notificação',
  })
  created_at: Date;
}
