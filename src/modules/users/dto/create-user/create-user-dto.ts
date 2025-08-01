import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RoleEnum } from 'src/enums/role.enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'User email', example: 'user@mail.ru' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'User password', example: 'pass123' })
  password: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  @ApiProperty({ description: 'User role', example: RoleEnum.USER })
  role: RoleEnum;
}
