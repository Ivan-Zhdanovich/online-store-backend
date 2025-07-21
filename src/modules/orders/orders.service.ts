import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.repository';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { OrderItemRepository } from './repositories/orderItem.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: OrderItemRepository,
  ) {}
}
