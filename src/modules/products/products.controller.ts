import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product/create-product-dto';
import { Product } from './entities/product.entity';
import { UpdateProductDTO } from './dto/update-product/update-product-dto';
import { CreateCategoryDTO } from './dto/create-category/create-category-dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDTO } from './dto/update-category/update-category-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() product: CreateProductDTO): Promise<Product> {
    return await this.productService.createProduct(product);
  }

  @Get()
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get()
  findProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findProductById(id);
  }

  @Patch()
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDTO,
  ) {
    return this.productService.updateProduct(id, product);
  }

  @Delete()
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.removeProduct(id);
  }

  @Post('categories')
  @HttpCode(201)
  async createCategory(@Body() category: CreateCategoryDTO): Promise<Category> {
    return await this.productService.createCategory(category);
  }

  @Get('categories')
  findAllCategories() {
    return this.productService.findAllCategories();
  }

  @Get('categories/:id')
  findCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findCategoryById(id);
  }

  @Patch('categories/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryDTO,
  ) {
    return this.productService.updateCategory(id, category);
  }

  @Delete()
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productService.removeCategory(id);
  }
}
