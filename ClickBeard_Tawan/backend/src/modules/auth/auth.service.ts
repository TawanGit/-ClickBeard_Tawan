import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { LoginClientDto } from '../client/dtos/login-client-dto';
import {
  ClientRole,
  RegisterClientDto,
} from '../client/dtos/register-client-dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private db: DatabaseService,
  ) {}

  async signIn(loginDto: LoginClientDto): Promise<{
    access_token: string;
    client: { id: number; name: string; email: string; role: ClientRole };
  }> {
    const queryClient = await this.db.query(
      'SELECT * FROM clients WHERE email = $1',
      [loginDto.email],
    );
    if (queryClient.rows.length === 0) {
      throw new NotFoundException('E-mail ou senha está incorreta');
    }

    const client = queryClient.rows[0];

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      client.password,
    );
    if (!passwordMatch)
      throw new UnauthorizedException('E-mail ou senha está incorreta');
    // usamos e-mail ou senha incorreta para dificultar em caso de invasões
    const payload = { userId: client.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        role: client.role,
      },
    };
  }

  async signUp(registerDto: RegisterClientDto) {
    const { name, email, password } = registerDto;

    const existingUser = await this.db.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    if (existingUser.rows.length > 0) {
      throw new ConflictException('Email já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword],
    );

    return result.rows[0];
  }
}
