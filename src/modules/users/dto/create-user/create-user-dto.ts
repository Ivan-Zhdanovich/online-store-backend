import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Role;
}
