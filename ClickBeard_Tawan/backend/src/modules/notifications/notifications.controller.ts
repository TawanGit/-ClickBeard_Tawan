import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NotificationsDto } from './dtos/notifications-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { NotificationResponseDto } from './dtos/notifications-response-dto';
import { AuthGuard } from '../auth/guard/jwt-auth.guard';
@ApiTags('Notificações')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}
  @Post()
  @ApiOperation({
    summary: 'Criar uma nova notificação',
    description:
      'Este endpoint cria uma nova notificação para um cliente específico. É necessário informar a mensagem, o ID do cliente e se a notificação foi lida.',
  })
  @ApiBody({ type: NotificationsDto })
  @ApiResponse({
    status: 201,
    description: 'Notificação criada com sucesso.',
    type: NotificationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos. Verifique os campos obrigatórios.',
  })
  create(@Body() notificationsDto: NotificationsDto) {
    return this.notificationsService.create(notificationsDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  getNotificationsNotRead() {
    return this.notificationsService.getNotificationsNotRead();
  }
}
