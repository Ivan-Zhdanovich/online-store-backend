import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Category ID', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'Category name', example: 'passenger' })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
