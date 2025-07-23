import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order/create-order-dto';
import { UpdateOrderStatusDTO } from './dto/update-order/update-order-status-dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOrder(@Body() order: CreateOrderDTO) {
    return this.ordersService.createOrder(order);
  }

  @Get()
  findAllOrders() {
    return this.ordersService.findAllOrders();
  }

  @Get(':id')
  findOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOrderById(id);
  }

  @Patch(':id/status')
  updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateOrderStatusDTO,
  ) {
    return this.ordersService.updateOrderStatus(id, updateData);
  }

  @Delete(':id')
  removeOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.removeOrder(id);
  }
}
