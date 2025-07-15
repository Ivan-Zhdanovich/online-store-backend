import { PartialType } from '@nestjs/mapped-types';
import { CreateTireDTO } from '../create-tire/create-tire-dto';

export class UpdatePropertiesTireDTO extends PartialType(CreateTireDTO) {
  id: number;
}
