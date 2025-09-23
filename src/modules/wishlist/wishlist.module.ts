import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { WishListRepository } from './repositories/wishlistRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), UsersModule, ProductsModule],
  providers: [WishlistService, WishListRepository],
  controllers: [WishlistController],
  exports: [WishlistService],
})
export class WishlistModule {}
