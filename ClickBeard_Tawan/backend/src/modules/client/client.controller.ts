import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { RegisterClientDto } from './dtos/register-client-dto';
import { AuthGuard } from '../auth/guard/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new client' })
  @ApiBody({ type: RegisterClientDto })
  @ApiResponse({ status: 201, description: 'Client registered successfully' })
  signUp(@Body() registerClientDto: RegisterClientDto) {
    return this.clientService.signUp(registerClientDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all clients' })
  @ApiBearerAuth() // JWT Auth required
  @ApiResponse({ status: 200, description: 'List of all clients' })
  findAll() {
    return this.clientService.findAll();
  }
}
