import { Body, Controller, Post, Headers } from '@nestjs/common';
import { PaypayService } from './paypay.service';
import { CreatePaymentDto } from './dto/create-payment-dto';

@Controller('paypay')
export class PaypayController {
  constructor(private readonly paypayService: PaypayService) {}

  @Post('createQr')
  createQr(@Body() createQrDto: CreatePaymentDto) {
    return this.paypayService.createQr(createQrDto.amount);
  }

  @Post('oneTapCall')
  async oneTapCall(
    @Body() createQrDto: CreatePaymentDto,
    @Headers('User-Agent') userAgent: string,
  ) {
    console.log(createQrDto.amount);
    return await this.paypayService.oneTapCall(createQrDto.amount, userAgent);
  }
}
