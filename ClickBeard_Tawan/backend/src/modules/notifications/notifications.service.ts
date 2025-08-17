import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../database/repositories/notifications/notificationsRepository';
import { NotificationsDto } from './dtos/notifications-dto';

@Injectable()
export class NotificationsService {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async create(notificationsDto: NotificationsDto) {
    return await this.notificationsRepository.create(notificationsDto);
  }
  async getNotificationsNotRead() {
    return await this.notificationsRepository.getNotificationsNotRead();
  }
}
