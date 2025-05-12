import { Product } from 'src/product/entities/product.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ESubscribeType } from '../../enums/Subscribes.enum'

@Entity()
export class Subscribe {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: Date

  @Column({ type: 'enum', enum: ESubscribeType })
  type: ESubscribeType

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Product)
  product1: Product

  @ManyToOne(() => Product)
  product2: Product

  @ManyToOne(() => Product)
  drink: Product

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
