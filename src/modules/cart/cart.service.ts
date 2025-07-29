import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartRepository } from './repositories/cart.repository';
import { CartItem } from './entities/cartItem.entity';
import { CartItemRepository } from './repositories/cartItem.repository';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { CreateCartItemDTO } from './dto/create-cartItem/create-cartItem-dto';
import { UpdateCartItemDTO } from './dto/update-cartItem/update-cartItem-dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: CartItemRepository,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async findOrCreateCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      const user = await this.usersService.findOneById(userId);
      cart = this.cartRepository.create({ user, items: [] });
      cart = await this.cartRepository.save(cart);
    }
    return cart;
  }

  async addItem(
    userId: number,
    createCartData: CreateCartItemDTO,
  ): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);
    const { productId, quantity } = createCartData;
    const product = await this.productsService.findProductById(productId);
    let cartItem = cart.items.find((item) => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepository.create({ cart, product, quantity });
      cart.items.push(cartItem);
    }

    await this.cartItemRepository.save(cartItem);
    return this.cartRepository.save(cart);
  }

  async updateItem(
    userId: number,
    cartItemId: number,
    updateCartData: UpdateCartItemDTO,
  ) {
    const cart = await this.findOrCreateCart(userId);
    const cartItem = cart.items.find((item) => item.id === cartItemId);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = updateCartData.quantity;
    await this.cartItemRepository.save(cartItem);
    return this.cartRepository.save(cart);
  }
  async removeItem(userId: number, cartItemId: number): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);
    const cartItemIndex = cart.items.findIndex(
      (item) => item.id === cartItemId,
    );
    if (cartItemIndex === -1) {
      throw new NotFoundException('Cart item not found');
    }

    const [cartItem] = cart.items.splice(cartItemIndex, 1);
    await this.cartItemRepository.remove(cartItem);
    return this.cartRepository.save(cart);
  }

  async getCartSummary(userId: number): Promise<Cart> {
    return this.findOrCreateCart(userId);
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.findOrCreateCart(userId);
    await this.cartItemRepository.remove(cart.items);
    cart.items = [];
    await this.cartItemRepository.save(cart);
  }
}
