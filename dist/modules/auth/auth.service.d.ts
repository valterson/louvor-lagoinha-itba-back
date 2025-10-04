import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: Omit<User, 'password'>;
    }>;
    createDefaultUser(): Promise<void>;
}
