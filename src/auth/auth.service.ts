import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface'
import * as argon2 from 'argon2'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    await this.checkEmailUnique(registerDto.email)

    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Пароли не совпадают')
    }
    const user = this.userRepository.create(registerDto)
    user.password = await this.hashPassword(user.password)

    return this.userRepository.save(user)
  }

  async validateCredentials(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email)
    if (!user) {
      throw new UnauthorizedException('Пользователь не зарегистрирован')
    }
    if (!(await argon2.verify(user.password, loginDto.password))) {
      throw new UnauthorizedException('Неверный пароль')
    }
    return user
  }

  generateToken(user: User): string {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }
    const accessToken = this.jwtService.sign(payload)
    return accessToken
  }

  private async checkEmailUnique(email?: string) {
    if (!email) return
    const user = await this.userRepository.findOneBy({ email })
    if (user) {
      throw new ConflictException('Email уже используется')
    }
  }

  private async hashPassword(password: string) {
    return await argon2.hash(password)
  }
}
