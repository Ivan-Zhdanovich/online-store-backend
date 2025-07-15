import { DataSource, Repository } from 'typeorm';
import { Wheel } from '../entities/wheel.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WheelsRepository extends Repository<Wheel> {
  constructor(private dataSource: DataSource) {
    super(Wheel, dataSource.createEntityManager());
  }
}
