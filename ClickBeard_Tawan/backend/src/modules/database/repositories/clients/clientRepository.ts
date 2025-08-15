import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { RegisterClientDto } from 'src/modules/client/dtos/register-client-dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class ClientRepository {
  constructor(private db: DatabaseService) {}

  async findByEmail(email: string) {
    return await this.db.query('SELECT * FROM clients WHERE email = $1', [
      email,
    ]);
  }
  async findById(id: number) {
    return await this.db.query('SELECT * FROM clients WHERE id = $1', [id]);
  }

  async findAll() {
    const result = await this.db.query(`
    SELECT id, name, email, role, created_at
    FROM clients
  `);
    return result.rows;
  }
  async createWithHash(registerClientDto: RegisterClientDto) {
    const { email, name, password, role } = registerClientDto;

    const existing = await this.findByEmail(email);

    if (existing.rows.length > 0) {
      throw new ConflictException('Email já existe');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.db.query(
      'INSERT INTO clients (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email',
      [name, email, hashedPassword, role],
    );

    return result.rows[0];
  }
}
