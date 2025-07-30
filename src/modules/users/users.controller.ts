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
import { UpdatePropertiesUserDTO } from './dto/update-properties-user/update-user-properties-dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/role.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({
    description: 'The user has been successfully registered',
  })
  @HttpCode(HttpStatus.CREATED)
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('profileAll')
  @ApiOperation({ summary: 'Get all users profiles' })
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile/:id')
  @ApiOperation({ summary: 'Get a user profile by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Put('profile/:id')
  @ApiOperation({ summary: 'Updates a user with specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  updateUser(
    @Body() user: CreateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Patch('profile/:id')
  @ApiOperation({ summary: 'Updates properties of user with  specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  updateUserProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProperties: UpdatePropertiesUserDTO,
  ) {
    return this.usersService.update(id, userProperties);
  }

  @Delete('profile/:id')
  @ApiOperation({ summary: 'Delete a user with specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @HttpCode(204)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Delete('profile/softDelete/:id')
  @ApiOperation({ summary: 'Delete a user with specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @HttpCode(204)
  softDeleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.softRemove(id);
  }
}
