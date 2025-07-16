import { Tire } from 'src/modules/goods/tires/entities/tire.entity';
import { Wheel } from 'src/modules/goods/wheels/entities/wheel.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Tire, (tire) => tire.cart)
  tires: Tire[];

  @OneToMany(() => Wheel, (wheel) => wheel.cart)
  wheels: Wheel[];
}
