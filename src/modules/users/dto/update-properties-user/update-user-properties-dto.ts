import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from '../create-user/create-user-dto';

export class UpdatePropertiesUserDTO extends PartialType(CreateUserDTO) {
  id: number;
}
