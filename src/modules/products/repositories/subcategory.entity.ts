import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Subcategory } from '../entities/subcategory.entity';

@Injectable()
export class SubcategoriesRepository extends Repository<Subcategory> {
  constructor(private dataSource: DataSource) {
    super(Subcategory, dataSource.createEntityManager());
  }
}
