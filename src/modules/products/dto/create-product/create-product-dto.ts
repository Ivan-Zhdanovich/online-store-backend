import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Product name', example: 'Tire' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Product description', example: 'R16' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Product price', example: 75 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Product quantity', example: 4 })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Product category ID', example: 6 })
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Product subcategory ID', example: 4 })
  subcategoryId: number;
}
