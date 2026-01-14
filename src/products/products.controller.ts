import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  CreateProductSchema,
} from './dto/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductSchema,
} from './dto/update-product.dto';
import { AuthenticatedRequest } from 'src/auth/dto/token.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findAllByOwner(@Req() req: AuthenticatedRequest) {
    const ownerId = req.user.id;
    return this.productsService.findAllByOwner(ownerId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  create(@Body() data: CreateProductDto, @Req() req: AuthenticatedRequest) {
    const ownerId = req.user.id;
    return this.productsService.create(data, ownerId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ZodValidationPipe(UpdateProductSchema))
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const ownerId = req.user.id;
    return this.productsService.update(data, id, ownerId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const ownerId = req.user.id;
    return this.productsService.delete(id, ownerId);
  }
}
