import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

export class CategoriesRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
}
