import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any, loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: Omit<import("./entities/user.entity").User, "password">;
    }>;
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
