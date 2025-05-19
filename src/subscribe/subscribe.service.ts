import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { CreateSubscribeDto } from './dto/create-subscribe.dto'
import { UpdateSubscribeDto } from './dto/update-subscribe.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Subscribe } from './entities/subscribe.entity'
import { Not, Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { ESubscribeType } from 'src/enums/Subscribes.enum'
import { Product } from 'src/product/entities/product.entity'
import { DateService } from 'src/date/date.service'
import { ESubscribeStatus } from 'src/enums/SubscribeStatus.enum'

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dateService: DateService,
  ) {}

  async create(user: User, createSubscribeDto: CreateSubscribeDto) {
    if (!Object.values(ESubscribeType).includes(createSubscribeDto.type)) {
      throw new BadRequestException('Неверный формат подписки')
    }
    let dates: Date[] = []
    switch (createSubscribeDto.type) {
      case ESubscribeType.WEEK:
        dates = this.dateService.getWeekDates()
        break
      case ESubscribeType.WEEKDAY:
        dates = this.dateService.getWeekdaysOfMonth()
        break
      case ESubscribeType.WEEKEND:
        dates = this.dateService.getWeekendDaysOfMonth()
        break
      case ESubscribeType.EVERYDAY:
        dates = this.dateService.getMonthDates()
        break
    }
    const product1 = await this.productRepository.findOneBy({
      id: createSubscribeDto.product1Id,
    })
    const product2 = await this.productRepository.findOneBy({
      id: createSubscribeDto.product2Id,
    })
    const drink = await this.productRepository.findOneBy({
      id: createSubscribeDto.drinkId,
    })
    if (!product1 || !product2 || !drink) {
      throw new BadRequestException('Товар не существует')
    }

    const subscribes = dates.map((date) => {
      const subscribe = new Subscribe()
      subscribe.street = createSubscribeDto.street
      subscribe.building = createSubscribeDto.building
      subscribe.flat = createSubscribeDto.flat
      subscribe.floor = createSubscribeDto.floor
      subscribe.deliveryTime = createSubscribeDto.deliveryTime
      subscribe.user = user
      subscribe.date = date
      subscribe.product1 = product1
      subscribe.product2 = product2
      subscribe.drink = drink

      return subscribe
    })

    return await this.subscribeRepository.save(subscribes)
  }

  async findAll(userId: number) {
    const current = await this.subscribeRepository.find({
      where: { user: { id: userId }, status: Not(ESubscribeStatus.COMPLETED) },
    })
    if (current) {
      return current
    }
    return null
  }

  async current(userId: number) {
    return await this.subscribeRepository.find({
      where: { user: { id: userId }, status: Not(ESubscribeStatus.COMPLETED) },
      relations: ['product1', 'product2', 'drink'],
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribe`
  }

  async update(userId: number, updateSubscribeDto: UpdateSubscribeDto) {
    const subscribe = await this.subscribeRepository.findOne({
      where: {
        user: { id: userId },
      },
      order: {
        id: 'ASC',
      },
    })
    if (!subscribe) {
      throw new ForbiddenException('Подписка не найдена')
    }

    this.subscribeRepository.merge(subscribe, updateSubscribeDto)

    if (updateSubscribeDto.product1Id) {
      const product = await this.productRepository.findOneBy({
        id: updateSubscribeDto.product1Id,
      })
      if (!product) {
        throw new BadRequestException('Товар не существует')
      }
      subscribe.product1 = product
    }
    if (updateSubscribeDto.product2Id) {
      const product = await this.productRepository.findOneBy({
        id: updateSubscribeDto.product2Id,
      })
      if (!product) {
        throw new BadRequestException('Товар не существует')
      }
      subscribe.product2 = product
    }
    if (updateSubscribeDto.drinkId) {
      const product = await this.productRepository.findOneBy({
        id: updateSubscribeDto.drinkId,
      })
      if (!product) {
        throw new BadRequestException('Товар не существует')
      }
      subscribe.drink = product
    }

    return this.subscribeRepository.save(subscribe)
  }

  async remove(userId: number) {
    await this.subscribeRepository.delete({ user: { id: userId } })
    return { success: true }
  }
}
