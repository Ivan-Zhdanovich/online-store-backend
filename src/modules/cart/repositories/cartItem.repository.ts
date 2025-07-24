import { DataSource, Repository } from 'typeorm';
import { CartItem } from '../entities/cartItem.entity';

export class CartItemRepository extends Repository<CartItem> {
  constructor(private dataSource: DataSource) {
    super(CartItem, dataSource.createEntityManager());
  }
}
