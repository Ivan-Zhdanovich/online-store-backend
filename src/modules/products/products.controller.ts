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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product/create-product-dto';
import { Product } from './entities/product.entity';
import { UpdateProductDTO } from './dto/update-product/update-product-dto';
import { CreateCategoryDTO } from './dto/create-category/create-category-dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDTO } from './dto/update-category/update-category-dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/role.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { CreateSubcategoryDTO } from './dto/create-subcategory/create-subcategory-dto';
import { Subcategory } from './entities/subcategory.entity';
import { UpdateSubcategoryDTO } from './dto/update-subcategory/update-subcategory-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDTO })
  @ApiCreatedResponse({
    description: 'The product has been successfully created',
  })
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() product: CreateProductDTO): Promise<Product> {
    return await this.productsService.createProduct(product);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Product,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Product })
  findProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findProductById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a product with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Product identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Product })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDTO,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product with specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'Product identifier' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.removeProduct(id);
  }

  @Post('categories')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDTO })
  @ApiCreatedResponse({
    description: 'The category has been successfully created',
    type: Category,
  })
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() category: CreateCategoryDTO): Promise<Category> {
    return await this.productsService.createCategory(category);
  }

  @Get('categories/all')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Category,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('categories/:id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Category ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Category,
  })
  findCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findCategoryById(id);
  }

  @Patch('categories/:id')
  @ApiOperation({ summary: 'Updates properties of category with specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'Category identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Category,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryDTO,
  ) {
    return this.productsService.updateCategory(id, category);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete a category with specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'Category identifier' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.removeCategory(id);
  }

  @Post('subcategories')
  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiBody({ type: CreateSubcategoryDTO })
  @ApiCreatedResponse({
    description: 'The subcategory has been successfully created',
    type: Subcategory,
  })
  @HttpCode(HttpStatus.CREATED)
  async createSubcategory(
    @Body() subcategory: CreateSubcategoryDTO,
  ): Promise<Subcategory> {
    return await this.productsService.createSubcategory(subcategory);
  }

  @Get('subcategories/all')
  @ApiOperation({ summary: 'Get all subcategories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Subcategory,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAllSubcategories() {
    return this.productsService.findAllSubcategories();
  }

  @Get('subcategories/:id')
  @ApiOperation({ summary: 'Get a subcategory by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Subcategory ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Subcategory,
  })
  findSubcategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findSubcategoryById(id);
  }

  @Patch('subcategories/:id')
  @ApiOperation({
    summary: 'Updates properties of subcategory with specified ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Subcategory identifier',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Category,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  updateSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() subcategoryData: UpdateSubcategoryDTO,
  ) {
    return this.productsService.updateSubcategory(id, subcategoryData);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Delete('subcategories/:id')
  @ApiOperation({ summary: 'Delete a subcategory with specified ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Subcategory identifier',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeSubcategory(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.removeSubcategory(id);
  }
}
