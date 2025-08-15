import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterClientDto } from './dtos/register-client-dto';
import { JwtService } from '@nestjs/jwt';
import { ClientRepository } from '../database/repositories/clients/clientRepository';
@Injectable()
export class ClientService {
  constructor(
    private jwtService: JwtService,
    private clientRepository: ClientRepository,
  ) {}

  async signUp(registerClientDto: RegisterClientDto) {
    const result =
      await this.clientRepository.createWithHash(registerClientDto);

    return result;
  }

  async findAll() {
    return await this.clientRepository.findAll();
  }
}
