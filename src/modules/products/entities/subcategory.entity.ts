import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.entity';

@Entity('Subcategories')
export class Subcategory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Subcategory ID', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'Subcategory name', example: 'summer' })
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
