import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductsRepository) {}

  async findAll() {
    return this.productRepository.findAll({ status: 'available' });
  }

  async findAllByOwner(ownerId: string) {
    return this.productRepository.findAll({ ownerId });
  }

  async findById(id: string) {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto, ownerId: string) {
    return this.productRepository.create(createProductDto, ownerId);
  }

  private async validateProductAccess(id: string, ownerId: string) {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (product.ownerId !== ownerId) {
      throw new UnauthorizedException(
        'No autorizado para actualizar este producto',
      );
    }

    if (product.status === 'auctioning' || product.status === 'sold') {
      throw new ConflictException(
        'No se puede actualizar un producto en subasta o vendido',
      );
    }

    return product;
  }

  async update(
    updateProductDto: UpdateProductDto,
    id: string,
    ownerId: string,
  ) {
    await this.validateProductAccess(id, ownerId);

    return this.productRepository.update(updateProductDto, id);
  }

  async delete(id: string, ownerId: string) {
    await this.validateProductAccess(id, ownerId);

    return this.productRepository.delete(id);
  }
}
