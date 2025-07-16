import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddGoodsToCartDTO {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  quantity: number;
}
