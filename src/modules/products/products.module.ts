import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Subcategory } from './entities/subcategory.entity';
import { JwtService } from '@nestjs/jwt';
import { Review } from '../reviews/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, Subcategory, Review])],
  controllers: [ProductsController],
  providers: [ProductsService, JwtService],
  exports: [ProductsService],
})
export class ProductsModule {}
