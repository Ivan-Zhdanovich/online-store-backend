import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
