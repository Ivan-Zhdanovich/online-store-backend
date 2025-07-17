import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';
import { Role } from 'src/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  async hashedPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async create(userData: Partial<User>): Promise<User> {
    if (userData.password === null) {
      userData.password = await this.hashedPassword(userData.password);
    }
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
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

  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findOneById(id);
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOneById(id);
    await this.usersRepository.remove(user);
  }

  async softRemove(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async restore(id: number): Promise<void> {
    await this.usersRepository.restore(id);
  }

  async updateUserRole(id: number, newRole: Role): Promise<User> {
    const user = await this.findOneById(id);
    user.role = newRole;
    return this.usersRepository.save(user);
  }
}
