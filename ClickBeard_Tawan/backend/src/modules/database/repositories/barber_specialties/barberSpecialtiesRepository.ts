import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../database.service';

@Injectable()
export class BarberSpecialtiesRepository {
  constructor(private db: DatabaseService) {}

  async create(barberId: number, specialtyId: number) {
    const barber = await this.db.query('SELECT * FROM barbers WHERE id = $1', [
      barberId,
    ]);
    if (barber.rows.length < 1) {
      throw new NotFoundException('Barbeiro não encontrado');
    }

    const specialty = await this.db.query(
      'SELECT * FROM specialties WHERE id = $1',
      [specialtyId],
    );
    if (specialty.rows.length < 1) {
      throw new NotFoundException('Especialidade não encontrada');
    }

    const exists = await this.db.query(
      'SELECT * FROM barber_specialties WHERE barber_id = $1 AND specialty_id = $2',
      [barberId, specialtyId],
    );
    if (exists.rows.length > 0) {
      throw new BadRequestException(
        'Esta especialidade já está atribuída a este barbeiro',
      );
    }

    const result = await this.db.query(
      'INSERT INTO barber_specialties (barber_id, specialty_id) VALUES ($1, $2) RETURNING *',
      [barberId, specialtyId],
    );

    return result.rows[0];
  }

  async findBarbersWithoutSpecialty(specialtyId: number) {
    const specialty = await this.db.query(
      'SELECT * FROM specialties WHERE id = $1',
      [specialtyId],
    );
    if (specialty.rows.length < 1) {
      throw new NotFoundException('Especialidade não encontrada');
    }

    const barbers = await this.db.query(
      'SELECT b.* FROM barbers b LEFT JOIN barber_specialties bs ON b.id = bs.barber_id AND bs.specialty_id = $1 WHERE bs.specialty_id IS NULL',
      [specialtyId],
    );

    return barbers.rows;
  }
}
