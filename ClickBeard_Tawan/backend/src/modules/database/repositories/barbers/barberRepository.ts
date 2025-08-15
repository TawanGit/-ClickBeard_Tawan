import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { RegisterBarberDto } from 'src/modules/barber/dtos/register-barber-dto';
import { BarberSpecialtiesRepository } from '../barber_specialties/barberSpecialtiesRepository';
import { SpecialtieRepository } from '../specialties/specialtieRepository';
@Injectable()
export class BarberRepository {
  constructor(
    private db: DatabaseService,
    private specialtiesRepository: SpecialtieRepository,
    private barberSpecialtiesRepository: BarberSpecialtiesRepository,
  ) {}

  async createWithSpecialty(registerBarberDto: RegisterBarberDto) {
    const { cpf, name, age, accounting_data, specialtyId } = registerBarberDto;
    const specialtyExist =
      await this.specialtiesRepository.findById(specialtyId);

    if (!specialtyExist.length) {
      throw new NotFoundException('Especialidade não encontrada');
    }
    const newBarber = await this.db.query(
      'INSERT INTO barbers (cpf, name, age, accounting_data) VALUES ($1, $2, $3, $4) RETURNING *',
      [cpf, name, age, accounting_data],
    );

    const newRelation = await this.barberSpecialtiesRepository.create(
      newBarber.rows[0].id,
      specialtyId,
    );

    return {
      barber: newBarber.rows[0],
      specialtiesRelation: newRelation,
    };
  }
  async findById(id: number) {
    return await this.db.query('SELECT * FROM barbers WHERE id = $1', [id]);
  }

  async findByCpf(cpf: string) {
    const barber = await this.db.query('SELECT * FROM barbers WHERE cpf = $1', [
      cpf,
    ]);

    return barber.rows;
  }

  async verifyUser(cpf: string, accounting_data: Date) {
    const barber = await this.db.query(
      'SELECT * FROM barbers WHERE cpf = $1 AND accounting_data = $2',
      [cpf, accounting_data],
    );

    return barber.rows[0];
  }

  async findAll() {
    const result = await this.db.query('SELECT * FROM barbers');
    return result.rows;
  }

  async findBySpecialties(id: number) {
    const result = await this.db.query(
      'SELECT b.* FROM barbers b JOIN barber_specialties bs ON b.id = bs.barber_id WHERE bs.specialty_id = $1',
      [id],
    );
    return result.rows;
  }
}
