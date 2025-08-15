import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterBarberDto } from './dtos/register-barber-dto';
import { LoginBarberDto } from './dtos/login-barber-dto';
import { BarberRepository } from '../database/repositories/barbers/barberRepository';
import { BarberSpecialtiesRepository } from '../database/repositories/barber_specialties/barberSpecialtiesRepository';

@Injectable()
export class BarberService {
  constructor(
    private barberRepository: BarberRepository,
    private barberSpecialtiesRepository: BarberSpecialtiesRepository,
  ) {}

  async signIn(loginBarberDto: LoginBarberDto) {
    // decidi usar essa abordagem pois me inspirei na UVV EAD, aonde temos que colocar a matricula
    const { cpf, accounting_data } = loginBarberDto;

    const barber = await this.barberRepository.verifyUser(cpf, accounting_data);

    if (!barber) {
      throw new BadRequestException('Usuario não encontrado');
    }
    return barber;
  }
  async signUp(registerBarberDto: RegisterBarberDto) {
    const { cpf, specialtyId } = registerBarberDto;
    // decidi não usar password para uma abordagem diferente e praticar melhor o SQL QUERY
    const barberExist = await this.barberRepository.findByCpf(cpf);

    if (barberExist.length > 0) {
      throw new ConflictException('Já existe um barbeiro com esse CPF.');
    }

    const result =
      await this.barberRepository.createWithSpecialty(registerBarberDto);

    return result;
  }
  async findAll() {
    return this.barberRepository.findAll();
  }

  async findBySpecialties(id: number) {
    return this.barberRepository.findBySpecialties(id);
  }
}
