import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

export class ProductsRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
}
