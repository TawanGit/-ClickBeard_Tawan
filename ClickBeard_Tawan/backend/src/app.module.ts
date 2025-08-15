import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { BarberModule } from './modules/barber/barber.module';
import { AppointmentsService } from './modules/appointments/appointments.service';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { AppointmentRepository } from './modules/database/repositories/appointments/appointmentRepository';
import { ClientRepository } from './modules/database/repositories/clients/clientRepository';
import { BarberRepository } from './modules/database/repositories/barbers/barberRepository';
import { SpecialtieRepository } from './modules/database/repositories/specialties/specialtieRepository';
import { BarberSpecialtiesRepository } from './modules/database/repositories/barber_specialties/barberSpecialtiesRepository';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ClientModule,
    BarberModule,
    AppointmentsModule,
    SpecialtiesModule,
  ],
  controllers: [],
  providers: [
    AppointmentsService,
    AppointmentRepository,
    ClientRepository,
    BarberRepository,
    SpecialtieRepository,
    BarberSpecialtiesRepository,
  ],
})
export class AppModule {}
