import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Goods } from 'src/enums/goods.enum';
import { Wheels } from 'src/enums/wheels.enum';

export class CreateWheelDTO {
  @IsString()
  @IsNotEmpty()
  category: Goods.Wheels;

  @IsString()
  @IsNotEmpty()
  subcategory: Wheels;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  radius: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
