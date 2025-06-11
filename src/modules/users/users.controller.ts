import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user/create-user-dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() user: CreateUserDTO): Promise<User | void> {
    try {
      return await this.usersService.create(user);
    } catch (error) {
      if (error) {
        throw new HttpException(
          'user with this email already exists',
          HttpStatus.CONFLICT,
        );
      }
    }
  }
}
