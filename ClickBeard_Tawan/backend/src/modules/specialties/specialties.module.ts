import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { DatabaseService } from '../database/database.service';
import { SpecialtieRepository } from '../database/repositories/specialties/specialtieRepository';

@Module({
  providers: [SpecialtiesService, DatabaseService, SpecialtieRepository],
  controllers: [SpecialtiesController],
})
export class SpecialtiesModule {}
