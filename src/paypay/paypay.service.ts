import { Injectable } from '@nestjs/common';
import { CreatePaypayDto } from './dto/create-paypay.dto';
import { UpdatePaypayDto } from './dto/update-paypay.dto';

@Injectable()
export class PaypayService {
  create(createPaypayDto: CreatePaypayDto) {
    return 'This action adds a new paypay';
  }

  findAll() {
    return `This action returns all paypay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paypay`;
  }

  update(id: number, updatePaypayDto: UpdatePaypayDto) {
    return `This action updates a #${id} paypay`;
  }

  remove(id: number) {
    return `This action removes a #${id} paypay`;
  }
}
