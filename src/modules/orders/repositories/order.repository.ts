import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
