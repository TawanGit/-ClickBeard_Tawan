import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';
import { AppointmentRepository } from '../database/repositories/appointments/appointmentRepository';

@Injectable()
export class AppointmentsService {
  constructor(private appointmentRepository: AppointmentRepository) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentRepository.create(createAppointmentDto);
  }

  async getAllAppointmentToday() {
    return await this.appointmentRepository.getAllAppointmentsToday();
  }

  async getFutureAppointments() {
    return await this.appointmentRepository.getFutureAppointments();
  }

  async getAppointmentsByClient(id: number) {
    return await this.appointmentRepository.findByClient(id);
  }

  async getAppointmentsByBarber(id: number) {
    return await this.appointmentRepository.findByBarber(id);
  }

  async getAvailableSlots(date: string, barber_id: number) {
    return await this.appointmentRepository.getAvailableSlots(date, barber_id);
  }

  async changeStatus(status: string, id: number) {
    return await this.appointmentRepository.changeStatus(status, id);
  }

  async delete(id: number) {
    return await this.appointmentRepository.deleteById(id);
  }
}
