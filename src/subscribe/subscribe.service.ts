import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateSubscribeDto } from './dto/create-subscribe.dto'
import { UpdateSubscribeDto } from './dto/update-subscribe.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Subscribe } from './entities/subscribe.entity'
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { ESubscribeType } from 'src/enums/Subscribes.enum'
import { Product } from 'src/product/entities/product.entity'
import { DateService } from 'src/date/date.service'

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
      subscribe.type = createSubscribeDto.type
      subscribe.user = user
      subscribe.date = date
      subscribe.product1 = product1
      subscribe.product2 = product2
      subscribe.drink = drink

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
