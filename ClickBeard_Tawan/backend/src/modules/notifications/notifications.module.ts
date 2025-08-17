import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from '../database/repositories/notifications/notificationsRepository';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [NotificationsService, NotificationsRepository, DatabaseService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
