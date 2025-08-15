import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { AuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [AuthService, DatabaseService, AuthGuard],
  exports: [AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
