import { Injectable } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from '../orders/repositories/orders.repository';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: OrdersRepository,
  ) {}

  async getSalesReport(startDate: Date, endDate: Date) {
    const orders = await this.ordersRepository
      .createQueryBuilder('order')
      .where('order.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;

    return { totalSales, totalOrders, orders };
  }

  async getAnalytics() {
    const totalUsers = await this.ordersRepository.query(
      'SELECT COUNT(*) FROM user',
    );
    const totalProducts = await this.ordersRepository.query(
      'SELECT COUNT(*) FROM product',
    );
    const totalOrders = await this.ordersRepository.query(
      'SELECT COUNT(*) FROM "order"',
    );

    return {
      totalUsers: totalUsers[0].count,
      totalProducts: totalProducts[0].count,
      totalOrders: totalOrders[0].count,
    };
  }
}
