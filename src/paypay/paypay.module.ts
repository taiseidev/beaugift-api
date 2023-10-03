import { Module } from '@nestjs/common';
import { PaypayService } from './paypay.service';
import { PaypayController } from './paypay.controller';

@Module({
  controllers: [PaypayController],
  providers: [PaypayService],
})
export class PaypayModule {}
