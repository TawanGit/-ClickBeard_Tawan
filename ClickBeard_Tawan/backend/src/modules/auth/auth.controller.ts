import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginClientDto } from '../client/dtos/login-client-dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login a client' })
  @ApiBody({ type: LoginClientDto })
  @ApiResponse({ status: 200, description: 'Client logged in successfully' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  signIn(@Body() loginClientDto: LoginClientDto) {
    return this.authService.signIn(loginClientDto);
  }
}
