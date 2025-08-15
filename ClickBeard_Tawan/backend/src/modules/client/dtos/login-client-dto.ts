import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginClientDto {
  @ApiProperty({
    description: 'Email do cliente',
    example: 'cliente@example.com',
  })
  @IsEmail({}, { message: 'Digite um email válido' })
  email: string;

  @ApiProperty({ description: 'Senha do cliente', example: '123456' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;
}
