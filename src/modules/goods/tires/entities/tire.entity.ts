import { Goods } from 'src/enums/goods.enum';
import { Tires } from 'src/enums/tires.enum';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tires')
export class Tire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Goods, default: Goods.Tires })
  category: Goods.Tires;

  @Column({ type: 'enum', enum: Tires })
  subcategory: Tires;

  @Column()
  manufacturer: string;

  @Column()
  radius: string;

  @Column()
  price: number;

  @ManyToOne(() => Cart, (cart) => cart.tires)
  cart: Cart;
}
