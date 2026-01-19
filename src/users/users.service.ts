import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { Sequelize } from 'sequelize-typescript';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private sequelize: Sequelize,
    private walletService: WalletService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const t = await this.sequelize.transaction();
    try {
      const existingUser = await this.usersRepository.findByUsernameOrEmail(
        createUserDto.username,
        createUserDto.email,
      );

      if (existingUser) {
        throw new ConflictException('Usuario o correo ya existente.');
      }

      const user = await this.usersRepository.create(createUserDto, t);

      await this.walletService.createWallet(user.id, t);

      await t.commit();

      return user;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
