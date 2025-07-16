import { IsNumber } from 'class-validator';
import { CreateWheelDTO } from '../create-wheel/create-wheel-dto';

export class WheelDTO extends CreateWheelDTO {
  @IsNumber()
  id: number;
}
