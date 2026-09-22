import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from '../../../cart-item/infrastructure/entity/cartItem.entity';

export enum Role { ADMIN = 'Admin', USER = 'User' }
@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name:'password',nullable: false })
  password: string;

  @Column({ default: Role.USER, type:'enum',enum:Role})
  role: Role;

 @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];
}