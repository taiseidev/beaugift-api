import { Injectable } from '@nestjs/common';
import { STRIPE_SECRET_KEY } from 'src/config/app.config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  async createCheckout(amount: number, currency: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'usd',
            product_data: {
              name: 'Custom product',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://uphydn.net/dokkiri/howtoplay.html',
      cancel_url:
        'https://www.fmworld.net/cs/azbyclub/qanavi/jsp/qacontents.jsp?PID=1504-6638',
    });
    return session;
  }
}
