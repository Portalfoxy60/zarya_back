import { Category } from 'src/category/entities/category.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
} from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column({ nullable: true })
  image: string

  @ManyToOne(() => Category, (category) => category.products)
  category: Category

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
