import { IsNumber } from 'class-validator';

import { CreateUserDTO } from '../create-user/create-user-dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO extends CreateUserDTO {
  @IsNumber()
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;
}
