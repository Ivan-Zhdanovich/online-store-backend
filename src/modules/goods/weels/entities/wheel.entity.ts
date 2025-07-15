import { Goods } from 'src/enums/goods.enum';
import { Wheels } from 'src/enums/wheels.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Wheels')
export class Wheel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Goods, default: Goods.Wheels })
  category: Goods.Wheels;

  @Column({ type: 'enum', enum: Wheels })
  subcategory: Wheels;

  @Column({ unique: true })
  name: string;
}
