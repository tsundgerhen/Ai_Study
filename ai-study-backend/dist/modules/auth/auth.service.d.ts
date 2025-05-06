import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    validateUser(payload: any): Promise<import("./interfaces/user.interface").User | null>;
}
