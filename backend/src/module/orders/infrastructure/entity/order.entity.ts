import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../../user/infrastructure/entity/user.entity";
import { OrderItem } from "./orderItem.entity";
export enum OrderStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
}
@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(() => UserEntity)
  user:UserEntity;

  @OneToMany(() => OrderItem,item=>item.order,{
      cascade:true
  })
  items:OrderItem[];

  @Column('decimal')
  totalAmount:number;

  @Column({
      type:'enum',
      enum:OrderStatus,
      default:OrderStatus.PENDING
  })
  status:OrderStatus;

  @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn()
  updatedAt:Date;
}