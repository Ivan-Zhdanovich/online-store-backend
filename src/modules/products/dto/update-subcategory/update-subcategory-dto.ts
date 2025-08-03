import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSubcategoryDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Subcategory name', example: 'winter' })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Category ID', example: 2 })
  category?: number;
}
