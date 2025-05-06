import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { SessionController } from './session.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'super-secret', // use .env in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, SessionController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}