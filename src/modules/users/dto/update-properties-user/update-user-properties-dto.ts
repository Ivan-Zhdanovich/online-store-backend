import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from '../create-user/create-user-dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePropertiesUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty({ description: 'User ID', example: 1 })
  @IsNumber()
  id: number;
}
