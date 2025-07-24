import { DataSource, Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

export class CartRepository extends Repository<Cart> {
  constructor(private dataSource: DataSource) {
    super(Cart, dataSource.createEntityManager());
  }
}
