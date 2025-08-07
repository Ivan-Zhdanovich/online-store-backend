import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartRepository } from './repositories/cart.repository';
import { CartItem } from './entities/cartItem.entity';
import { CartItemRepository } from './repositories/cartItem.repository';
import { CreateCartItemDTO } from './dto/create-cartItem/create-cartItem-dto';
import { UpdateCartItemDTO } from './dto/update-cartItem/update-cartItem-dto';
import { Product } from '../products/entities/product.entity';
import { ProductsRepository } from '../products/repositories/products.repositories';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: CartItemRepository,
    @InjectRepository(Product)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async findOrCreateCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['cartItems', 'cartItems.product'],
    });
    if (!cart) {
      cart = this.cartRepository.create({ user: { id: userId } });
      await this.cartRepository.save(cart);
    }
    return cart;
  }

  async addItem(
    userId: number,
    createCartItemData: CreateCartItemDTO,
  ): Promise<Cart> {
    const { productId, quantity } = createCartItemData;
    const cart = await this.findOrCreateCart(userId);
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingCartItem = cart.cartItems?.find(
      (cartItem) => cartItem.product.id === productId,
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await this.cartItemRepository.save(existingCartItem);
    } else {
      const newCartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity,
      });
      await this.cartItemRepository.save(newCartItem);
      cart.cartItems.push(newCartItem);
    }

    return cart;
  }

  async updateItem(
    userId: number,
    cartItemId: number,
    updateCartData: UpdateCartItemDTO,
  ) {
    const cart = await this.findOrCreateCart(userId);
    const cartItem = cart.cartItems.find(
      (cartItem) => cartItem.id === cartItemId,
    );
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = updateCartData.quantity;
    await this.cartItemRepository.save(cartItem);
    return this.cartRepository.save(cart);
  }
  async removeItem(userId: number, cartItemId: number): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);
    const cartItemIndex = cart.cartItems.findIndex(
      (cartItem) => cartItem.id === cartItemId,
    );
    if (cartItemIndex === -1) {
      throw new NotFoundException('Cart item not found');
    }

    const [cartItem] = cart.cartItems.splice(cartItemIndex, 1);
    await this.cartItemRepository.remove(cartItem);
    return this.cartRepository.save(cart);
  }

  async getCartSummary(userId: number): Promise<Cart> {
    return this.findOrCreateCart(userId);
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.findOrCreateCart(userId);
    await this.cartItemRepository.remove(cart.cartItems);
    cart.cartItems = [];
    await this.cartItemRepository.save(cart);
  }
}
