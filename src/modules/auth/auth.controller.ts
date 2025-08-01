import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Controller,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from 'src/guards/auth.guard';
import { SignInDTO } from './dto/signIn/signIn-dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleEnum } from 'src/enums/role.enum';
import { Roles } from 'src/guards/role.decorator';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User log on' })
  @ApiBody({ type: SignInDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully log on',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "The user's email address or password is incorrect",
  })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInData: SignInDTO) {
    return this.authService.signIn(signInData);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
