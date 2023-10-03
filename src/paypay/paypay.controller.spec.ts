import { Test, TestingModule } from '@nestjs/testing';
import { PaypayController } from './paypay.controller';
import { PaypayService } from './paypay.service';

describe('PaypayController', () => {
  let controller: PaypayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaypayController],
      providers: [PaypayService],
    }).compile();

    controller = module.get<PaypayController>(PaypayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
