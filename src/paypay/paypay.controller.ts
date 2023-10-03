import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaypayService } from './paypay.service';
import { CreatePaypayDto } from './dto/create-paypay.dto';
import { UpdatePaypayDto } from './dto/update-paypay.dto';

@Controller('paypay')
export class PaypayController {
  constructor(private readonly paypayService: PaypayService) {}

  @Post()
  create(@Body() createPaypayDto: CreatePaypayDto) {
    return this.paypayService.create(createPaypayDto);
  }

  @Get()
  findAll() {
    return this.paypayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paypayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaypayDto: UpdatePaypayDto) {
    return this.paypayService.update(+id, updatePaypayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paypayService.remove(+id);
  }
}
