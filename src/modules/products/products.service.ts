import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductsRepository } from './repositories/products.repositories';
import { CategoriesRepository } from './repositories/categories.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: ProductsRepository,
    @InjectRepository(Category)
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async createProduct(productData: Partial<Product>): Promise<Product> {
    if (productData.category) {
      const category = await this.categoriesRepository.findOneBy(
        productData.category,
      );
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }
    const product = this.productsRepository.create(productData);
    return this.productsRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['category'] });
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(
    id: number,
    updateData: Partial<Product>,
  ): Promise<Product> {
    const product = await this.findProductById(id);
    Object.assign(product, updateData);
    return this.productsRepository.save(product);
  }

  async removeProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);
    await this.productsRepository.remove(product);
  }

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoriesRepository.create(categoryData);
    return this.categoriesRepository.save(category);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['products'] });
  }

  async findCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(
    id: number,
    updateData: Partial<Category>,
  ): Promise<Category> {
    const category = await this.findCategoryById(id);
    Object.assign(category, updateData);
    return this.categoriesRepository.save(category);
  }

  async removeCategory(id: number): Promise<void> {
    const category = await this.findCategoryById(id);
    await this.categoriesRepository.remove(category);
  }
}
