import { DataSource, Repository } from 'typeorm';
import { OrderItem } from '../entities/orderItem.entity';

export class OrderItemRepository extends Repository<OrderItem> {
  constructor(private dataSource: DataSource) {
    super(OrderItem, dataSource.createEntityManager());
  }
}
