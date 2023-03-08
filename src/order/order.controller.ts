import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderCreateDto } from './models/order-create.dto';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async all(@Query('page') page: number = 1) {
    return this.orderService.paginate(page, ['order_items']);
  }

  @Post()
  async create(@Body() body: OrderCreateDto) {
    return this.orderService.create(body);
  }
}
