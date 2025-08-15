import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { CreateAppointmentDto } from 'src/modules/appointments/dtos/create-appointment-dto';
import { ClientRepository } from '../clients/clientRepository';
import { BarberRepository } from '../barbers/barberRepository';
import { format } from 'date-fns-tz';
@Injectable()
export class AppointmentRepository {
  constructor(
    private db: DatabaseService,
    private clientRepository: ClientRepository,
    private barberRepository: BarberRepository,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { client_id, barber_id, appointment_date, status } =
      createAppointmentDto;

    const clientExist = await this.clientRepository.findById(client_id);

    const barberExist = await this.barberRepository.findById(barber_id);

    const appointmentBusy = await this.appointmentIsBusy(appointment_date);

    if (appointmentBusy.rows.length > 0) {
      throw new BadRequestException('Já existe um agendamento nesse horario');
    }

    if (clientExist.rows.length === 0) {
      throw new NotFoundException('Cliente não encontrado');
    }

    if (barberExist.rows.length === 0) {
      throw new NotFoundException('Barbeiro não encontrado');
    }

    const newAppointment = await this.db.query(
      'INSERT INTO appointments (client_id, barber_id, appointment_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [client_id, barber_id, appointment_date, status],
    );

    return newAppointment.rows[0];
  }

  async findById(id: number) {
    const appointments = await this.db.query(
      `
    SELECT * FROM appointments WHERE id = $1
    `,
      [id],
    );
    return appointments.rows;
  }

  async findByClient(id: number) {
    const appointments = await this.db.query(
      `
    SELECT a.*, b.id AS barber_id, b.name AS barber_name
    FROM appointments a
    JOIN barbers b ON a.barber_id = b.id
    WHERE a.client_id = $1
    `,
      [id],
    );
    return appointments.rows;
  }

  async findByBarber(id: number) {
    const appointments = await this.db.query(
      `
    SELECT a.*, b.id AS barber_id, b.name AS barber_name
    FROM appointments a
    JOIN barbers b ON a.barber_id = b.id
    WHERE a.barber_id = $1
    `,
      [id],
    );
    return appointments.rows;
  }
  async getAvailableSlots(date: string, barberId: number) {
    const query = `
    SELECT slot
    FROM generate_series(
  ($1 || ' 08:00')::timestamp AT TIME ZONE 'America/Sao_Paulo',
  ($1 || ' 18:00')::timestamp AT TIME ZONE 'America/Sao_Paulo',
  '30 min'
  ) AS slot
  WHERE NOT EXISTS (
  SELECT 1
  FROM appointments
  WHERE barber_id = $2
    AND appointment_date AT TIME ZONE 'America/Sao_Paulo' >= slot
    AND appointment_date AT TIME ZONE 'America/Sao_Paulo' < slot + interval '30 minutes'
);

  `;

    const result = await this.db.query(query, [date, barberId]);

    const slotsInBR: string[] = result.rows.map((r: { slot: string }) => {
      const dateObj = new Date(r.slot);
      return dateObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo',
      });
    });

    return slotsInBR.sort();
  }

  async getAllAppointmentsToday() {
    const query = `
    SELECT 
      a.id,
      a.status,
      a.appointment_date,
      b.id AS barber_id,
      b.name AS barber_name,
      c.id AS client_id,
      c.name AS client_name
    FROM appointments a
    JOIN barbers b ON a.barber_id = b.id
    JOIN clients c ON a.client_id = c.id
    WHERE (a.appointment_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo')::date
          = (NOW() AT TIME ZONE 'America/Sao_Paulo')::date
    ORDER BY a.appointment_date ASC
  `;

    const result = await this.db.query(query);
    return result.rows;
  }

  async getFutureAppointments() {
    const result = await this.db.query(`
  SELECT 
    a.id,
    a.status,
    a.appointment_date,
    b.id AS barber_id,
    b.name AS barber_name,
    c.id AS client_id,
    c.name AS client_name
FROM appointments a
JOIN barbers b ON a.barber_id = b.id
JOIN clients c ON a.client_id = c.id
WHERE a.appointment_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo'
      > NOW() AT TIME ZONE 'America/Sao_Paulo'
ORDER BY a.appointment_date ASC;
`);

    return result.rows;
  }

  async appointmentIsBusy(appointment_date: string) {
    const result = await this.db.query(
      'SELECT * FROM appointments WHERE appointment_date = $1 ',
      [appointment_date],
    );

    return result;
  }

  async changeStatus(status: string, id: number) {
    const appointment = await this.findById(id);

    if (appointment.length === 0) {
      throw new NotFoundException('Agendamento não encontrado');
    }
    const allowedStatuses = ['scheduled', 'completed', 'canceled'];

    if (!allowedStatuses.includes(status)) {
      throw new BadRequestException(
        `Status inválido. Use: ${allowedStatuses.join(', ')}`,
      );
    }
    if (!status) {
      throw new BadRequestException('Selecione um status');
    }

    const result = await this.db.query(
      'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *',
      [status, id],
    );

    return result.rows[0];
  }
  async deleteById(id: number) {
    return await this.db.query('DELETE FROM appointments WHERE id = $1', [id]);
  }
}
