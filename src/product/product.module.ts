import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Category } from 'src/category/entities/category.entity'
import { MailModule } from 'src/mail/mail.module'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), MailModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
