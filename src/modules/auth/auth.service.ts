import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/signIn/signIn-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInData: SignInDTO): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(signInData.email);
    const isPasswordValid = signInData.password === user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        "The user's email address or password is incorrect",
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
