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
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user/create-user-dto';
import { UserDTO } from './dto/user/user-dto';
import { UpdatePropertiesUserDTO } from './dto/update-properties-user/updateUserPropertiesDto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(201)
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

  @Get()
  getUsers(): Promise<UserDTO[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<UserDTO> {
    console.log(`REQUEST ID ${req?.headers['x-request-id']}`);
    console.log(`LOCALE IS ${req['locale']}`);
    return this.usersService.findOneById(id);
  }

  @Put(':id')
  updateUser(
    @Body() user: CreateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateUserDTO> {
    return this.usersService.update(id, user);
  }

  @Patch(':id')
  updateUserProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProperties: UpdatePropertiesUserDTO,
  ) {
    return this.usersService.update(id, userProperties);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Delete('softDelete/:id')
  @HttpCode(204)
  softDeleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.softRemove(id);
  }
}
