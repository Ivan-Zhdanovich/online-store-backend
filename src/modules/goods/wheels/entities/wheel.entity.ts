import { Goods } from 'src/enums/goods.enum';
import { Wheels } from 'src/enums/wheels.enum';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Wheels')
export class Wheel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Goods, default: Goods.Wheels })
  category: Goods.Wheels;

  @Column({ type: 'enum', enum: Wheels })
  subcategory: Wheels;

  @Column()
  manufacturer: string;

  @Column()
  radius: string;

  @Column()
  price: number;

  @ManyToOne(() => Cart, (cart) => cart.wheels)
  cart: Cart;
}
