import { Module } from '@nestjs/common';
import { BarberController } from './barber.controller';
import { BarberService } from './barber.service';
import { BarberRepository } from '../database/repositories/barbers/barberRepository';
import { BarberSpecialtiesRepository } from '../database/repositories/barber_specialties/barberSpecialtiesRepository';
import { SpecialtieRepository } from '../database/repositories/specialties/specialtieRepository';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [BarberController],
  providers: [
    BarberService,
    DatabaseService,
    BarberRepository,
    BarberSpecialtiesRepository,
    SpecialtieRepository,
  ],
})
export class BarberModule {}
