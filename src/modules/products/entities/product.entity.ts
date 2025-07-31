import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'Product name', example: 'Tire' })
  name: string;

  @Column('text')
  @ApiProperty({ description: 'Product description', example: 'R16' })
  description: string;

  @Column('decimal')
  @ApiProperty({ description: 'Product price', example: 75 })
  price: number;

  @Column()
  @ApiProperty({ description: 'Product quantity', example: 4 })
  quantity: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
