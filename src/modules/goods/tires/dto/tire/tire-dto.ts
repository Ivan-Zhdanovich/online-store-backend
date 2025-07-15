import { IsNumber } from 'class-validator';
import { CreateTireDTO } from '../create-tire/create-tire-dto';

export class TireDTO extends CreateTireDTO {
  @IsNumber()
  id: number;
}
