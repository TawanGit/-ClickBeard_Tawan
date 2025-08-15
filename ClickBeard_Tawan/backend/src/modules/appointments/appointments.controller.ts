import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';
import { AuthGuard } from '../auth/guard/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('appointments')
@ApiBearerAuth() // JWT Auth
@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiBody({ type: CreateAppointmentDto })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments for today' })
  getAllAppointmentToday() {
    return this.appointmentService.getAllAppointmentToday();
  }

  @Get('future')
  @ApiOperation({ summary: 'Get all future appointments' })
  getFutureAppointments() {
    return this.appointmentService.getFutureAppointments();
  }

  @Get('available')
  @ApiOperation({
    summary: 'Get available time slots for a barber on a specific date',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    description: 'Date to check availability',
    example: '2025-08-14',
  })
  @ApiQuery({
    name: 'barber_id',
    required: true,
    description: 'Barber ID',
    example: 1,
  })
  getAvailableSlots(
    @Query('date') date: string,
    @Query('barber_id') barberId: string,
  ) {
    const barberIdNumber = parseInt(barberId, 10);
    return this.appointmentService.getAvailableSlots(date, barberIdNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointments by client ID' })
  @ApiParam({ name: 'id', description: 'Client ID', type: Number })
  getAppointmentsByClient(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.getAppointmentsByClient(id);
  }

  @Get('barber/:id')
  @ApiOperation({ summary: 'Get appointments by barber ID' })
  @ApiParam({ name: 'id', description: 'Barber ID', type: Number })
  getAppointmentsByBarber(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.getAppointmentsByBarber(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Change the status of an appointment' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        status: {
          type: 'string',
          example: 'completed',
          enum: ['scheduled', 'completed', 'canceled'],
        },
      },
    },
  })
  changeStatus(@Body() body: { id: number; status: string }) {
    return this.appointmentService.changeStatus(body.status, body.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment by ID' })
  @ApiParam({ name: 'id', description: 'Appointment ID', type: Number })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.delete(id);
  }
}
