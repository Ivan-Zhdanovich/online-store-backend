import { Injectable, NotFoundException } from '@nestjs/common';
import { Tire } from './entities/tire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TiresRepository } from './repositories/tires.repository';

@Injectable()
export class TiresService {
  constructor(
    @InjectRepository(Tire)
    private readonly tiresRepository: TiresRepository,
  ) {}

  create(tireData: Partial<Tire>): Promise<Tire> {
    const tire = this.tiresRepository.create(tireData);
    return this.tiresRepository.save(tire);
  }

  findAll(): Promise<Tire[]> {
    return this.tiresRepository.find();
  }

  async findOneById(id: number): Promise<Tire> {
    const user = await this.tiresRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Tire with id ${id} not found`);
    }
    return user;
  }
}
