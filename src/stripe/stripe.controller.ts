// stripe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';

import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: { amount: number; currency: string },
  ) {
    const { amount, currency } = body;

    const result = await this.stripService.createCheckout(amount, currency);

    return result;
  }
}
