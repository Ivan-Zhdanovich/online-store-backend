import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Product name', example: 'wheel' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Product description', example: 'R18' })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Product price', example: 120 })
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Product quantity', example: 6 })
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Product category ID', example: 4 })
  categoryId?: number;
}
