import { Product } from 'src/product/entities/product.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
