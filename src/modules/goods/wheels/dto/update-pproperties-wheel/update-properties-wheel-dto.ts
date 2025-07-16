import { PartialType } from '@nestjs/mapped-types';
import { CreateWheelDTO } from '../create-wheel/create-wheel-dto';

export class UpdatePropertiesWheelDTO extends PartialType(CreateWheelDTO) {
  id: number;
}
