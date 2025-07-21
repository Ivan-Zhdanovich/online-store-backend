import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  items: CreateOrderDTO[];
}
