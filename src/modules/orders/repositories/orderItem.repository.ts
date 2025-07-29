import { DataSource, Repository } from 'typeorm';
import { OrderItem } from '../entities/orderItem.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderItemsRepository extends Repository<OrderItem> {
  constructor(private dataSource: DataSource) {
    super(OrderItem, dataSource.createEntityManager());
  }
}
