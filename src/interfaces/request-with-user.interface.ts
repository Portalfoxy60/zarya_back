import { User } from 'src/user/entities/user.entity'

export interface IRequestWithUser extends Request {
  user: User
}
