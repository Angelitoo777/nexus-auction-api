import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './entities/product.entity';
import { ModelCtor } from 'sequelize-typescript';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Products) private productsData: ModelCtor<Products>,
  ) {}

  async findAll(where: any = {}): Promise<Products[]> {
    return this.productsData.findAll({
      where,
      include: [{ model: User, attributes: ['username'] }],
    });
  }

  async findOne(id: string): Promise<Products | null> {
    return this.productsData.findByPk(id);
  }

  async create(data: CreateProductDto, ownerId: string): Promise<Products> {
    return this.productsData.create({ ...data, ownerId });
  }

  async update(data: UpdateProductDto, id: string): Promise<Products> {
    await this.productsData.update(data, { where: { id } });
    return this.findOne(id) as Promise<Products>;
  }

  async delete(id: string): Promise<void> {
    await this.productsData.destroy({ where: { id } });
    return;
  }
}
