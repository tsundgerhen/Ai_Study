import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { users } from './mock-user.store';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signup(dto: SignupDto) {
    const existing = users.find(u => u.email === dto.email);
    if (existing) throw new BadRequestException('User already exists');

    const hash = await bcrypt.hash(dto.password, 10);
    users.push({ email: dto.email, passwordHash: hash });
    return { message: 'Signup successful' };
  }

  async login(dto: LoginDto) {
    const user = users.find(u => u.email === dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async validateUser(payload: any) {
    return users.find(u => u.email === payload.email) || null;
  }
}