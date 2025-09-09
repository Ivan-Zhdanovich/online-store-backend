import { Controller } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaymentsService } from '../payments/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly paypalService: PaypalService,
  ) {}
}
