import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddSpecialtyToBarberDto {
  @IsNotEmpty({ message: 'O ID do barbeiro não pode ser vazio' })
  @ApiProperty({
    description: 'The ID of the barber to which the specialty will be added',
    example: 1,
  })
  barberId: number;
  @IsNotEmpty({ message: 'O ID da especialidade não pode ser vazio' })
  @ApiProperty({
    description: 'The ID of the specialty to add to the barber',
    example: 2,
  })
  specialtyId: number;
}
