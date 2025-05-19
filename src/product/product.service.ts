import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'
import { Category } from 'src/category/entities/category.entity'
import { OrderDto } from './dto/order.dto'
import { MailService } from 'src/mail/mail.service'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly mailService: MailService,
  ) {}

  async create(createProductDto: CreateProductDto, imagePath: string) {
    const product = this.productRepository.create(createProductDto)
    product.image = imagePath
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    })
    if (!category) {
      throw new BadRequestException('Категория не существует')
    }
    product.category = category
    return this.productRepository.save(product)
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    imagePath: string,
  ) {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) {
      throw new NotFoundException('Продукт не найден')
    }
    const category = await this.categoryRepository.findOneBy({
      id: updateProductDto.categoryId,
    })
    if (!category) {
      throw new NotFoundException('Категория не найдена')
    }
    this.productRepository.merge(product, updateProductDto)
    product.image = imagePath
    product.category = category
    return this.productRepository.save(product)
  }

  async findAll() {
    return await this.productRepository.find({ relations: ['category'] })
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  async remove(id: number) {
    return await this.productRepository.delete(id)
  }

  async order(email: string, orderDto: OrderDto) {
    await this.mailService.sendOrder(email, orderDto)
  }
}
