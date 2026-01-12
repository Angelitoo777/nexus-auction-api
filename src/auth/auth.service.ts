import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: CreateUserDto) {
    const { password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.register({
      ...userData,
      password: hashedPassword,
    });

    return {
      message: 'Usuario registrado exitosamente',
      username: newUser.username,
      email: newUser.email,
    };
  }

  createToken(user: TokenDto) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      rol: user.rol,
    };

    return this.jwtService.sign(payload);
  }
}
