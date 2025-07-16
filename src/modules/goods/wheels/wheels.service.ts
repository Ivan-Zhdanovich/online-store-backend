import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Wheel } from './entities/wheel.entity';
import { WheelsRepository } from './repositories/wheels.repository';

@Injectable()
export class WheelsService {
  constructor(
    @InjectRepository(Wheel)
    private readonly wheelsRepository: WheelsRepository,
  ) {}

  create(wheelData: Partial<Wheel>): Promise<Wheel> {
    const wheel = this.wheelsRepository.create(wheelData);
    return this.wheelsRepository.save(wheel);
  }

  findAll(): Promise<Wheel[]> {
    return this.wheelsRepository.find();
  }

  async findOneById(id: number): Promise<Wheel> {
    const wheel = await this.wheelsRepository.findOneBy({ id });
    if (!wheel) {
      throw new NotFoundException(`Wheel with id ${id} not found`);
    }
    return wheel;
  }

  async update(id: number, updateData: Partial<Wheel>): Promise<Wheel> {
    const wheel = await this.findOneById(id);
    Object.assign(wheel, updateData);
    return this.wheelsRepository.save(wheel);
  }

  async remove(id: number): Promise<void> {
    const wheel = await this.findOneById(id);
    await this.wheelsRepository.remove(wheel);
  }

  async softRemove(id: number): Promise<void> {
    await this.wheelsRepository.softDelete(id);
  }

  async restore(id: number): Promise<void> {
    await this.wheelsRepository.restore(id);
  }
}
