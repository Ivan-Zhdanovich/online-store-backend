import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn/signIn-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInData: SignInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(signInData.email);
    if (user?.password !== signInData.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      userEmail: user.email,
      userRole: user.role,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
