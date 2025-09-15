import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  addToWishlist(
    @Request() req,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const userId: number = req.user.id;
    return this.wishlistService.addToWishlist(userId, productId);
  }

  @Delete('productId')
  removeFromWishlist(
    @Request() req,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const userId: number = req.user.id;
    return this.wishlistService.removeFromWishlist(userId, productId);
  }

  @Get()
  viewWishlist(@Request() req) {
    const userId: number = req.user.id;
    return this.wishlistService.viewWishlist(userId);
  }
}
