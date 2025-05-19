import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  street: string

  @Column()
  building: number

  @Column()
  flat: number

  @Column()
  floor: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
