import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaypayModule } from './paypay/paypay.module';

@Module({
  imports: [PaypayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
