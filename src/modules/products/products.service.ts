import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductsRepository } from './repositories/products.repositories';
import { CategoriesRepository } from './repositories/categories.repository';
import { CreateProductDTO } from './dto/create-product/create-product-dto';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoriesRepository } from './repositories/subcategory.entity';
import { UpdateSubcategoryDTO } from './dto/update-subcategory/update-subcategory-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: ProductsRepository,
    @InjectRepository(Category)
    private readonly categoriesRepository: CategoriesRepository,
    @InjectRepository(Subcategory)
    private readonly subcategoriesRepository: SubcategoriesRepository,
  ) {}

  async searchProducts(query: string): Promise<Product[]> {
    return this.productsRepository
      .createQueryBuilder('product')
      .where('product.name LIKE :query', { query: `%${query}` })
      .orWhere('product.description LIKE :query', { query: `%${query}` })
      .getMany();
  }

  async filterProducts(
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<Product[]> {
    let queryBuilder = this.productsRepository.createQueryBuilder('product');

    if (categoryId) {
      queryBuilder = queryBuilder.andWhere(
        'product.category.id = :categoryId',
        { categoryId },
      );
    }

    if (minPrice) {
      queryBuilder = queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice,
      });
    }

    if (maxPrice) {
      queryBuilder = queryBuilder.andWhere('product,price <= :maxPrice', {
        maxPrice,
      });
    }

    return queryBuilder.getMany();
  }

  async findCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id: id },
      relations: ['products', 'subcategories'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async createProduct(productData: CreateProductDTO): Promise<Product> {
    const category = await this.findCategoryById(productData.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const product = this.productsRepository.create(productData);
    return this.productsRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['category', 'subcategory'],
    });
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id: id },
      relations: ['category', 'subcategory'],
    });
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
    return this.categoriesRepository.find({
      relations: ['products', 'subcategories'],
    });
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

  async findSubcategoryById(id: number): Promise<Subcategory> {
    const subcategory = await this.subcategoriesRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
    return subcategory;
  }

  async findAllSubcategories(): Promise<Subcategory[]> {
    return this.subcategoriesRepository.find({ relations: ['category'] });
  }

  async createSubcategory(
    subcategoryData: Partial<Subcategory>,
  ): Promise<Subcategory> {
    const { categoryId } = subcategoryData;
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    const subcategory = this.subcategoriesRepository.create(subcategoryData);
    return this.subcategoriesRepository.save(subcategory);
  }

  async updateSubcategory(
    id: number,
    updateData: UpdateSubcategoryDTO,
  ): Promise<Subcategory> {
    const subcategory = await this.findSubcategoryById(id);
    Object.assign(subcategory, updateData);
    return this.subcategoriesRepository.save(subcategory);
  }

  async removeSubcategory(id: number): Promise<void> {
    const subcategory = await this.findSubcategoryById(id);
    await this.subcategoriesRepository.remove(subcategory);
  }
}
