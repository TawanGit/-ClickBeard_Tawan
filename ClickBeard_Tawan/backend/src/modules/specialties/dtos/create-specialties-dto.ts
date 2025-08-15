import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialtiesDto {
  @ApiProperty({
    description: 'Nome da especialidade',
    example: 'Corte Masculino',
  })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;
}
