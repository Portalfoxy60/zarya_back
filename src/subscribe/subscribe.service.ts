import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateSubscribeDto } from './dto/create-subscribe.dto'
import { UpdateSubscribeDto } from './dto/update-subscribe.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Subscribe } from './entities/subscribe.entity'
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { ESubscribeType } from 'src/enums/Subscribes.enum'
import { Product } from 'src/product/entities/product.entity'

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createSubscribeDto: CreateSubscribeDto) {
    const dates = [
      '2025-05-11',
      '2025-05-12',
      '2025-05-13',
      '2025-05-14',
      '2025-05-15',
      '2025-05-16',
      '2025-05-17',
    ]
    const user = await this.userRepository.findOneBy({ id: 1 })
    const product = await this.productRepository.findOneBy({ id: 1 })
    if (
      !Object.values(ESubscribeType).includes(createSubscribeDto.type) ||
      !user ||
      !product
    ) {
      throw new BadRequestException()
    }
    const subscribes = dates.map((date) => {
      const subscribe = new Subscribe()
      subscribe.type = createSubscribeDto.type
      subscribe.user = user
      subscribe.date = new Date(date)
      subscribe.product1 = product
      subscribe.product2 = product
      subscribe.drink = product

      return subscribe
    })
    return await this.subscribeRepository.save(subscribes)
  }

  findAll() {
    return `This action returns all subscribe`
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribe`
  }

  update(id: number, updateSubscribeDto: UpdateSubscribeDto) {
    return `This action updates a #${id} subscribe`
  }

  remove(id: number) {
    return `This action removes a #${id} subscribe`
  }
}
