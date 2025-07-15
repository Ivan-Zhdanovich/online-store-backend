import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Goods } from 'src/enums/goods.enum';
import { Tires } from 'src/enums/tires.enum';

export class CreateTireDTO {
  @IsString()
  @IsNotEmpty()
  category: Goods.Tires;

  @IsString()
  @IsNotEmpty()
  subcategory: Tires;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  radius: string;
}
