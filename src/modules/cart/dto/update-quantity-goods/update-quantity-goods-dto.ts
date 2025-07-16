import { IsNumber } from 'class-validator';

export class UpdateQuantityGoodsDTO {
  @IsNumber()
  quantity: number;
}
