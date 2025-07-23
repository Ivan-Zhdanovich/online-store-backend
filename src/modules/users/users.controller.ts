import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user/create-user-dto';
import { UserDTO } from './dto/user/user-dto';
import { UpdatePropertiesUserDTO } from './dto/update-properties-user/update-user-properties-dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDTO): Promise<UserDTO | void> {
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('profile')
  getUsers(): Promise<UserDTO[]> {
    return this.usersService.findAll();
  }

  @Get('profile/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
    return this.usersService.findOneById(id);
  }

  @Put('profile/:id')
  updateUser(
    @Body() user: CreateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateUserDTO> {
    return this.usersService.update(id, user);
  }

  @Patch('profile/:id')
  updateUserProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProperties: UpdatePropertiesUserDTO,
  ) {
    return this.usersService.update(id, userProperties);
  }

  @Delete('profile/:id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Delete('profile/softDelete/:id')
  @HttpCode(204)
  softDeleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.softRemove(id);
  }
}
