import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity('CartItem')
export class CartItem {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @OneToMany(() => Product, (product) => product.id)
  product: Product;

  @Column('int')
  quantity: number;
}
