import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';

@Injectable()
export class SpecialtieRepository {
  constructor(private db: DatabaseService) {}

  async findAll() {
    const result = await this.db.query('SELECT * FROM specialties');
    return result.rows;
  }

  async findById(id: number) {
    const result = await this.db.query(
      'SELECT * FROM specialties WHERE id = $1',
      [id],
    );
    return result.rows;
  }
}
