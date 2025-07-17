import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/signIn/signIn-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async signIn(signInData: SignInDTO): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(signInData.email);

    const isPasswordValid = await this.comparePasswords(
      signInData.password,
      user.password,
    );
    if (!isPasswordValid) {
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
