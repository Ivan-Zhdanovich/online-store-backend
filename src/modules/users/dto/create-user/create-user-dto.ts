import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RoleEnum } from 'src/enums/role.enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@mail.ru',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'The password of the user', example: 'pass123' })
  password: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  @ApiProperty({ description: 'The role of the user', example: RoleEnum.USER })
  role: RoleEnum;
}
