import { DataSource, Repository } from 'typeorm';
import { Tire } from '../entities/tire.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TiresRepository extends Repository<Tire> {
  constructor(private dataSource: DataSource) {
    super(Tire, dataSource.createEntityManager());
  }
}
