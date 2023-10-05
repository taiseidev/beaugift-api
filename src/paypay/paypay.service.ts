import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
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

  handleError(errorCode: string, errorMessage: string) {
    switch (errorCode) {
      case 'INVALID_REQUEST_PARAMS':
      case 'OP_OUT_OF_SCOPE':
      case 'MISSING_REQUEST_PARAMS':
      case 'DUPLICATE_DYNAMIC_QR_REQUEST':
      case 'PRE_AUTH_CAPTURE_UNSUPPORTED_MERCHANT':
      case 'PRE_AUTH_CAPTURE_INVALID_EXPIRY_DATE':
      case 'DYNAMIC_QR_BAD_REQUEST':
        throw new BadRequestException(errorMessage);
      case 'UNAUTHORIZED':
        throw new UnauthorizedException(errorMessage);
      case 'OPA_CLIENT_NOT_FOUND':
        throw new NotFoundException(errorMessage);

      case 'SERVICE_ERROR':
      case 'INTERNAL_SERVER_ERROR':
        throw new InternalServerErrorException(errorMessage);
      case 'MAINTENANCE_MODE':
        throw new ServiceUnavailableException(errorMessage);
      default:
        throw new InternalServerErrorException('An unknown error occurred');
    }
  }

  async oneTapCall(amount: number, userAgent: string) {
    const paymentId = uuidV4();

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

    try {
      const qrCodeResponse = await createQRCodeAsync(payload);
      console.log(qrCodeResponse);

      if (qrCodeResponse.resultInfo.code === 'SUCCESS') {
        const { codeId, url, expiryDate, requestedAt, amount, deeplink } =
          qrCodeResponse.data;
        return { codeId, url, expiryDate, requestedAt, amount, deeplink };
      } else {
        this.handleError(
          qrCodeResponse.resultInfo.code,
          qrCodeResponse.resultInfo.message,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to create one tap call');
    }
  }

  async createQr(amount: number) {
    const paymentId = uuidV4();

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

    try {
      QRCodeCreate(payload, (response) => {
        // if (response && response.errorInfo) {
        //   this.handleError(response.errorInfo.code, response.errorInfo.message);
        // }
        console.log(response);
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create QR code');
    }
  }
}

// QRCodeCreateのラッパー関数を作成
async function createQRCodeAsync(payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    QRCodeCreate(payload, (response) => {
      if (response) {
        resolve(response);
      } else {
        console.log('ここまでytなn');
        reject(new Error('Failed to get a valid response from PayPay'));
      }
    });
  });
}
