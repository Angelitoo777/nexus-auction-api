import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { ModelCtor } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User) private userData: ModelCtor<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userData.create({ ...createUserDto });
  }

  async findByEmail(email: string) {
    return this.userData.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.userData.findByPk(id);
  }

  async findByUsernameOrEmail(username: string, email: string) {
    return this.userData.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
  }

  async findAll() {
    return this.userData.findAll();
  }
}
