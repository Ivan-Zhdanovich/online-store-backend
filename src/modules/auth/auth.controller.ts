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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
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
