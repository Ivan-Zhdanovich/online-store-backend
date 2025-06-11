import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
