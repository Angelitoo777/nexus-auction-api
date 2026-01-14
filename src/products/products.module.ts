import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Products } from './entities/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [SequelizeModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
