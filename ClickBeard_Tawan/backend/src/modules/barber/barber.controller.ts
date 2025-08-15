import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RegisterBarberDto } from './dtos/register-barber-dto';
import { BarberService } from './barber.service';
import { LoginBarberDto } from './dtos/login-barber-dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AddSpecialtyToBarberDto } from './dtos/add-specialty-to-barber-dto';

@ApiTags('barbers')
@Controller('barbers')
export class BarberController {
  constructor(private barberService: BarberService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login a barber' })
  @ApiBody({ type: LoginBarberDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  signIn(@Body() loginBarberDto: LoginBarberDto) {
    return this.barberService.signIn(loginBarberDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new barber' })
  @ApiBody({ type: RegisterBarberDto })
  @ApiResponse({ status: 201, description: 'Barber registered successfully' })
  signUp(@Body() registerBarberDto: RegisterBarberDto) {
    return this.barberService.signUp(registerBarberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all barbers' })
  @ApiResponse({ status: 200, description: 'List of barbers' })
  findAll() {
    return this.barberService.findAll();
  }

  @ApiOperation({ summary: 'Get barbers without specialty' })
  @ApiParam({ name: 'specialtyId', type: Number })
  @Get('withoutSpecialty/:id')
  async getBarbersWithoutSpecialty(
    @Param('id', ParseIntPipe) specialtyId: number,
  ) {
    return this.barberService.getBarbersWithoutSpecialty(specialtyId);
  }

  @Get('/specialties/:id')
  @ApiOperation({ summary: 'Get barbers by specialty ID' })
  @ApiParam({ name: 'id', description: 'Specialty ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of barbers with the specialty',
  })
  findBySpecialties(@Param('id', ParseIntPipe) id: number) {
    return this.barberService.findBySpecialties(id);
  }

  @ApiOperation({ summary: 'Add specialty to barber' })
  @ApiBody({ type: AddSpecialtyToBarberDto })
  @Post('createSpecialtyToBarber')
  async addSpecialtyToBarber(
    @Body() addSpecialtyToBarber: AddSpecialtyToBarberDto,
  ) {
    return this.barberService.addSpecialtyToBarber(addSpecialtyToBarber);
  }
}
