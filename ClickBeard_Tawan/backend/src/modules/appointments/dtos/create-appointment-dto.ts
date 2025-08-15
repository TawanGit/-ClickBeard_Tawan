import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsIn,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'ID of the client making the appointment',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  client_id: number;

  @ApiProperty({ description: 'ID of the barber', example: 2 })
  @IsInt()
  @IsNotEmpty()
  barber_id: number;

  @ApiProperty({
    description: 'Date and time of the appointment',
    example: '2025-08-14T10:30:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  appointment_date: string;

  @ApiPropertyOptional({
    description: 'Status of the appointment',
    example: 'scheduled',
    enum: ['scheduled', 'completed', 'canceled'],
  })
  @IsString()
  @IsIn(['scheduled', 'completed', 'canceled'])
  status?: string;
}
