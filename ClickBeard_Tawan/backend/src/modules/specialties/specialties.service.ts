import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateSpecialtiesDto } from './dtos/create-specialties-dto';
import { SpecialtieRepository } from '../database/repositories/specialties/specialtieRepository';
@Injectable()
export class SpecialtiesService {
  constructor(
    private db: DatabaseService,
    private specialtiesRepository: SpecialtieRepository,
  ) {}

  async create(createSpecialties: CreateSpecialtiesDto) {
    const { name } = createSpecialties;
    const alreadyExist = await this.db.query(
      'SELECT * FROM specialties WHERE name = $1',
      [name],
    );
    if (alreadyExist.rows.length > 0) {
      throw new ConflictException('Essa especialidade já existe');
    }
    try {
      const newSpecialties = await this.db.query(
        'INSERT INTO specialties (name) VALUES ($1) RETURNING *',
        [name],
      );
      return newSpecialties.rows[0];
    } catch {
      throw new BadRequestException(
        'Ocorreu um erro ao criar uma nova especialidade',
      );
    }
  }

  async findAll() {
    return this.specialtiesRepository.findAll();
  }
}
