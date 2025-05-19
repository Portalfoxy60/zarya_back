import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import * as argon2 from 'argon2'
import { Address } from './entities/address.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['address'],
    })

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }
    const currentPassword = user.password

    this.userRepository.merge(user, updateUserDto)

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.checkEmailUnique(updateUserDto.email)
      user.email = updateUserDto.email
    }

    if (updateUserDto.password !== '' && updateUserDto.confirmPassword) {
      if (updateUserDto.password !== updateUserDto.confirmPassword) {
        throw new BadRequestException('Пароли не совпадают')
      }
      user.password = await this.hashPassword(updateUserDto.password)
    } else {
      user.password = currentPassword
    }

    if (updateUserDto.address) {
      if (user.address) {
        this.addressRepository.merge(user.address, updateUserDto.address)
      } else {
        const address = this.addressRepository.create(updateUserDto.address)
        user.address = await this.addressRepository.save(address)
      }
    }
    return await this.userRepository.save(user)
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id })
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  async getProfile(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['address'],
    })
    if (!user) {
      throw new BadRequestException()
    }
    return user
  }

  async getAddress(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['address'],
    })
    if (!user) {
      throw new BadRequestException()
    }
    return user.address
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
