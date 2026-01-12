import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByUsernameOrEmail(
      createUserDto.username,
      createUserDto.email,
    );

    if (existingUser) {
      throw new Error('Usuario o correo ya existente.');
    }

    return this.usersRepository.create(createUserDto);
  }
}
