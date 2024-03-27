import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtStrategy } from './strategies/jwt.strategy';

config();

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [UserModule, PassportModule, JwtModule.register({})],
})
export class AuthModule {}
