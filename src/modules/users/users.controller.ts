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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({
    description: 'The user has been successfully registered',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user with this email already exists',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDTO): Promise<User | void> {
    try {
      return await this.usersService.create(user);
    } catch (error) {
      if (error) {
        throw new HttpException(
          'The user with this email already exists',
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('profiles')
  @ApiOperation({ summary: 'Get all users profiles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: User,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile/:id')
  @ApiOperation({ summary: 'Get a user profile by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Put('profile/:id')
  @ApiOperation({ summary: 'Updates a user with specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user not found',
  })
  updateUser(
    @Body() user: CreateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Patch('profile/:id')
  @ApiOperation({ summary: 'Updates properties of user with  specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user not found',
  })
  updateUserProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProperties: UpdatePropertiesUserDTO,
  ) {
    return this.usersService.update(id, userProperties);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Delete('profile/:id')
  @ApiOperation({ summary: 'Delete a user with specified ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
