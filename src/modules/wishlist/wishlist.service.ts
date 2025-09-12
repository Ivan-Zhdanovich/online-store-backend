import { Injectable, NotFoundException } from '@nestjs/common';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class WishlistService {
  constructor(
    private wishlistRepository: Repository<Wishlist>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async addToWishlist(userId: number, productId: number): Promise<Wishlist> {
    const user = await this.usersService.findOneById(userId);
    const product = await this.productsService.findProductById(productId);

    const wishlist = this.wishlistRepository.create({ user, product });
    return this.wishlistRepository.save(wishlist);
  }

  async removeFromWishlist(userId: number, productId: number): Promise<void> {
    const wishlistItem = await this.wishlistRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
    if (!wishlistItem) {
      throw new NotFoundException('Wishlist item not found');
    }
    await this.wishlistRepository.remove(wishlistItem);
  }

  async viewWishlist(userId: number): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }
}
