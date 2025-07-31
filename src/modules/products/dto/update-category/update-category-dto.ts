import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Category name', example: 'truck' })
  name?: string;
}
