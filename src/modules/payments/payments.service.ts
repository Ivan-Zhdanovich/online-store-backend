import { BadRequestException, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { Order } from '../orders/entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {
    this.stripe = new Stripe('YOUR_STRIPE_SECRET_KEY', {
      apiVersion: '2025-08-27.basil',
    });
  }

  public getStripeInstance() {
    return this.stripe;
  }

  async createPaymentIntent(orderId: number): Promise<Stripe.PaymentIntent> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(order.total * 100),
      currency: 'usd',
      metadata: { orderId: order.id.toString() },
    });

    return paymentIntent;
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      const order = await this.ordersRepository.findOne({
        where: { id: Number(orderId) },
      });

      if (order) {
        order.status = Status.Paid;
        await this.ordersRepository.save(order);
      }
    }
  }
}
