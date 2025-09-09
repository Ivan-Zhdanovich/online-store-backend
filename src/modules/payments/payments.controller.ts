import { Controller, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Stripe } from 'stripe';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent/:orderId')
  createPaymentIntent(@Param('orderId') orderId: number) {
    return this.paymentsService.createPaymentIntent(orderId);
  }

  @Post('webhook')
  async handleWebhook(@Req() request: Request) {
    const sig = request.headers['stripe-signature'];

    if (sig !== undefined) {
      const stripeEvent: Stripe.Event = this.paymentsService
        .getStripeInstance()
        .webhooks.constructEvent(
          request.body,
          sig,
          'YOUR_STRIPE_WEBHOOK_SECRET',
        );
      await this.paymentsService.handleWebhook(stripeEvent);
    }
  }
}
