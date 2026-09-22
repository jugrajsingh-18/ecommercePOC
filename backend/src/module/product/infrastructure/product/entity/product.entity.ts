import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entity/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'int',
  })
  price: number;

  @Column('text', {
    array: true,
    nullable:true,
  },)
  images: string[];

  @Column({ type: 'int', default: 50 })
  availableQuantity: number;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({
    name: 'creation_at',
    type: 'timestamptz',
  })
  creationAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt?: Date;
}