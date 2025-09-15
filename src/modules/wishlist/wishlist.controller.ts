import { Controller, Param, Post, Request } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  addToWishlist(@Request() req, @Param('productId') productId: number) {
    const userId: number = req.user.id;
    return this.wishlistService.addToWishlist(userId, productId);
  }
}
