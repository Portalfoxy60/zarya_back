import { User } from 'src/user/entities/user.entity'

export class MeDto {
  id: number
  email: string
  role: string

  constructor(user: User) {
    this.id = user.id
    this.email = user.email
    this.role = user.role
  }
}
