import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Address } from './address.entity'
import { EUserRoles } from 'src/enums/Roles.enum'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  phone: string

  @Column({
    type: 'enum',
    enum: EUserRoles,
    default: EUserRoles.USER,
  })
  role: EUserRoles

  @OneToOne(() => Address, { nullable: true, cascade: true })
  @JoinColumn()
  address: Address

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
