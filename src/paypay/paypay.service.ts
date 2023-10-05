import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { Configure, QRCodeCreate } from '@paypayopa/paypayopa-sdk-node';
import {
  PAYPAY_CLIENT_ID,
  PAYPAY_CLIENT_SECRET,
  PAYPAY_MERCHANT_ID,
} from '../config/app.config';

@Injectable()
export class PaypayService {
  constructor() {
    Configure({
      clientId: PAYPAY_CLIENT_ID,
      clientSecret: PAYPAY_CLIENT_SECRET,
      merchantId: PAYPAY_MERCHANT_ID,
      productionMode: false,
    });
  }

  currency = 'JPY';
  codeType = 'ORDER_QR';
  orderDescription = 'BeauGift';
  redirectType = 'APP_DEEP_LINK';
  redirectUrl = 'https://flutter.dev/';

  async oneTapCall(amount: number, userAgent: string) {
    const paymentId = uuidV4;

    const payload = {
      merchantPaymentId: paymentId,
      amount: {
        amount: amount,
        currency: this.currency,
      },
      codeType: this.codeType,
      orderDescription: this.orderDescription,
      isAuthorization: false,
      redirectUrl: this.redirectUrl,
      redirectType: this.redirectType,
      userAgent: userAgent,
    };

    QRCodeCreate(payload, (response) => {
      console.log(response);
    });
  }

  async createQr(amount: number) {
    const paymentId = uuidV4;

    const payload = {
      merchantPaymentId: paymentId,
      amount: {
        amount: amount,
        currency: this.currency,
      },
      codeType: this.codeType,
      orderDescription: this.orderDescription,
      isAuthorization: false,
    };

    QRCodeCreate(payload, (response) => {
      console.log(response);
    });
  }
}
