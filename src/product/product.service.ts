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

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto)
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    })
    if (!category) {
      throw new BadRequestException('Категория не существует')
    }
    product.category = category
    return this.productRepository.save(product)
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
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
    product.category = category
    return this.productRepository.save(product)
  }

  async findAll() {
    return await this.productRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
