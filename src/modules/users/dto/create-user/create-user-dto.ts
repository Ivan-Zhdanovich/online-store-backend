import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RoleEnum } from 'src/enums/role.enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;
}
