import { Address } from 'src/user/entities/address.entity'
import { User } from 'src/user/entities/user.entity'

export class ProfileDto {
  id: number
  email: string
  firstname: string
  lastname: string
  phone: string
  address: Address

  constructor(user: User) {
    this.id = user.id
    this.email = user.email
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.phone = user.phone
    this.address = user.address
  }
}
