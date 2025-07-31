import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubcategoryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Subcategory name', example: 'winter' })
  name: string;
}
