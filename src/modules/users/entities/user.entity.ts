import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/role.enum';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'User email', example: 'mail@mail.ru' })
  email: string;

  @Column()
  @ApiProperty({ description: 'User password', example: 'userPass' })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  @ApiProperty({ description: 'User role', example: 'user' })
  role: RoleEnum;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
