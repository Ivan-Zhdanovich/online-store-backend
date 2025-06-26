import { IsNumber } from 'class-validator';

import { CreateUserDTO } from '../create-user/create-user-dto';

export class UserDTO extends CreateUserDTO {
  @IsNumber()
  id: number;
}
