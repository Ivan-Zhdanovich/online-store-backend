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
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dto/create-cartItem/create-cartItem-dto';
import { UpdateCartItemDTO } from './dto/update-cartItem/update-cartItem-dto';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:userId')
  @HttpCode(HttpStatus.CREATED)
  addItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCartItemData: CreateCartItemDTO,
  ) {
    return this.cartService.addItem(userId, createCartItemData);
  }

  @Patch('update/:itemId')
  updateItem(
    @Req() req: Request,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateData: UpdateCartItemDTO,
  ) {
    const userId: number = req.body.user.id;
    return this.cartService.updateItem(userId, itemId, updateData);
  }

  @Delete('remove/:itemId')
  removeItem(
    @Req() req: Request,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    const userId: number = req.body.user.id;
    return this.cartService.removeItem(userId, itemId);
  }

  @Get('summary')
  getCartSummary(@Req() req: Request) {
    const userId: number = req.body.user.id;
    return this.cartService.getCartSummary(userId);
  }

  @Post('checkout')
  async checkout(@Req() req: Request) {
    const userId: number = req.body.user.id;
    await this.cartService.clearCart(userId);
    return { message: 'Checkout successful' };
  }
}
