import { Module } from '@nestjs/common'
import { SubscribeService } from './subscribe.service'
import { SubscribeController } from './subscribe.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Subscribe } from './entities/subscribe.entity'
import { User } from 'src/user/entities/user.entity'
import { Product } from 'src/product/entities/product.entity'
import { DateModule } from 'src/date/date.module'
import { DateService } from 'src/date/date.service'

@Module({
  imports: [TypeOrmModule.forFeature([Subscribe, User, Product]), DateModule],
  controllers: [SubscribeController],
  providers: [SubscribeService, DateService],
})
export class SubscribeModule {}
