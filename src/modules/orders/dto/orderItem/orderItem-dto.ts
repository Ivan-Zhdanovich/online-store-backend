import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemDTO {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
