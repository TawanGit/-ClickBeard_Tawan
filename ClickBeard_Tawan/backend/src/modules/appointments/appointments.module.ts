import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { DatabaseService } from '../database/database.service';
import { AppointmentRepository } from '../database/repositories/appointments/appointmentRepository';
import { ClientRepository } from '../database/repositories/clients/clientRepository';
import { BarberRepository } from '../database/repositories/barbers/barberRepository';
import { SpecialtieRepository } from '../database/repositories/specialties/specialtieRepository';
import { BarberSpecialtiesRepository } from '../database/repositories/barber_specialties/barberSpecialtiesRepository';

@Module({
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    AppointmentRepository,
    DatabaseService,
    ClientRepository,
    BarberRepository,
    SpecialtieRepository,
    BarberSpecialtiesRepository,
  ],
})
export class AppointmentsModule {}
