import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string; user: Omit<User, 'password'> }> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
    try {
      // Verificar se o refresh token é válido
      const payload = this.jwtService.verify(refreshToken);

      // Buscar o usuário para garantir que ainda existe
      const user = await this.usersRepository.findOne({
        where: { id: payload.sub }
      });

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      // Gerar novos tokens
      const newPayload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(newPayload, { expiresIn: '15m' }),
        refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async createDefaultUser() {
    const existingUser = await this.usersRepository.findOne({
      where: { username: 'joao_teodoro' },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('160812', 10);
      const user = this.usersRepository.create({
        username: 'joao_teodoro',
        password: hashedPassword,
      });
      await this.usersRepository.save(user);
      console.log('Usuário padrão criado: joao_teodoro');
    }
  }
}
