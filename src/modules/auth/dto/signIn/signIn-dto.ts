import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email', example: 'user@mail.ru' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User password', example: 'pass' })
  password: string;
}
