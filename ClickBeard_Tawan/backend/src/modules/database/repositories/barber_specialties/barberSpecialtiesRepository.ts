import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { RegisterClientDto } from 'src/modules/client/dtos/register-client-dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BarberSpecialtiesRepository {
  constructor(private db: DatabaseService) {}

  async create(barberId: number, specialtyId: number) {
    const result = await this.db.query(
      'INSERT INTO barber_specialties (barber_id, specialty_id) VALUES ($1, $2) RETURNING *',
      [barberId, specialtyId],
    );
    return result.rows[0];
  }
}
