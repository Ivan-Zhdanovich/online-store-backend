import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from './repositories/orders.repository';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { OrderItemRepository } from './repositories/orderItem.repository';
import { CreateOrderDTO } from './dto/create-order/create-order-dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Status } from 'src/enums/status.enum';
import { UpdateOrderStatusDTO } from './dto/update-order/update-order-status-dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: OrdersRepository,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: OrderItemRepository,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async createOrder(orderData: CreateOrderDTO): Promise<Order> {
    const { userId, items } = orderData;

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const orderItems: OrderItem[] = [];
    let total = 0;

    for (const item of items) {
      const product = await this.productsService.findProductById(
        item.productId,
      );
      if (!product) {
        throw new NotFoundException(`Product with ${item.productId} not found`);
      }
      const orderItem = this.orderItemRepository.create({
        product,
        quantity: item.quantity,
        price: product.price * product.quantity,
      });
      orderItems.push(orderItem);
      total += orderItem.price;
    }
    const order = this.ordersRepository.create({
      user,
      status: Status.Pending,
      total,
      items: orderItems,
    });
    return this.ordersRepository.save(order);
  }

  async findAllOrders(): Promise<Order[]> {
    return await this.ordersRepository.find({
      relations: ['user', 'items', 'items.product'],
    });
  }

  async findOrderById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateOrderStatus(
    id: number,
    updateData: UpdateOrderStatusDTO,
  ): Promise<Order> {
    const order = await this.findOrderById(id);
    order.status = updateData.status;
    return this.ordersRepository.save(order);
  }

  async removeOrder(id: number) {
    const order = await this.findOrderById(id);
    return this.ordersRepository.remove(order);
  }
}
