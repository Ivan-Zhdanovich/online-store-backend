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
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dto/create-cartItem/create-cartItem-dto';
import { UpdateCartItemDTO } from './dto/update-cartItem/update-cartItem-dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  addItem(@Request() req, @Body() createCartItemData: CreateCartItemDTO) {
    const userId: number = req.user.sub;
    console.log(userId);

    return this.cartService.addItem(userId, createCartItemData);
  }

  @Patch('update/:itemId')
  updateItem(
    @Request() req,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateData: UpdateCartItemDTO,
  ) {
    const userId: number = req.user.sub;
    return this.cartService.updateItem(userId, itemId, updateData);
  }

  @Delete('remove/:itemId')
  removeItem(@Request() req, @Param('itemId', ParseIntPipe) itemId: number) {
    const userId: number = req.user.sub;
    return this.cartService.removeItem(userId, itemId);
  }

  @Get('summary')
  getCartSummary(@Request() req) {
    console.log(req);
    const userId: number = req.user.sub;
    console.log(`this id ${userId}`);
    return this.cartService.getCartSummary(userId);
  }

  @Post('checkout')
  async checkout(@Request() req) {
    const userId: number = req.user.sub;
    await this.cartService.clearCart(userId);
    return { message: 'Checkout successful' };
  }
}
