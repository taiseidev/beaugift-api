import { Body, Controller, Post, Headers } from '@nestjs/common';
import { PaypayService } from './paypay.service';
import { CreatePaymentDto } from './dto/create-payment-dto';

@Controller('paypay')
export class PaypayController {
  constructor(private readonly paypayService: PaypayService) {}

  @Post('createQr')
  createQr(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paypayService.createQr(createPaymentDto.amount);
  }

  @Post('oneTapCall')
  oneTapCall(
    @Body() createPaymentDto: CreatePaymentDto,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.paypayService.oneTapCall(createPaymentDto.amount, userAgent);
  }
}
