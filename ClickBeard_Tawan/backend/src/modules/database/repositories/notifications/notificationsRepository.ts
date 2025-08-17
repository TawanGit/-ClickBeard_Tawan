import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { RegisterBarberDto } from 'src/modules/barber/dtos/register-barber-dto';
import { BarberSpecialtiesRepository } from '../barber_specialties/barberSpecialtiesRepository';
import { SpecialtieRepository } from '../specialties/specialtieRepository';
import { NotificationsDto } from '../../../notifications/dtos/notifications-dto';
@Injectable()
export class NotificationsRepository {
  constructor(private db: DatabaseService) {}
  async create(notificationsDto: NotificationsDto) {
    const clientExist = await this.db.query(
      'SELECT * FROM clients WHERE id = $1',
      [notificationsDto.client_id],
    );

    if (clientExist.rows.length === 0) {
      throw new BadRequestException('Cliente não encontrado');
    }

    const result = await this.db.query(
      'INSERT INTO notifications (client_id, message) VALUES ($1, $2) RETURNING *',
      [notificationsDto.client_id, notificationsDto.message],
    );
    return result.rows[0];
  }
  async getNotificationsNotRead() {
    const result = await this.db.query(
      `SELECT 
      n.*, 
      c.id AS client_id, 
      c.name, 
      c.email
   FROM notifications n
   JOIN clients c ON n.client_id = c.id
   WHERE n.is_read = $1`,
      [false],
    );
    return result.rows;
  }
}
