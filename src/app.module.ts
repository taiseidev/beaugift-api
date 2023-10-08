import { Module } from '@nestjs/common';
import { PaypayModule } from './paypay/paypay.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [PaypayModule, StripeModule],
})
export class AppModule {}
