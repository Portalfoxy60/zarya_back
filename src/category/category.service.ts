import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto)
    return this.categoryRepository.save(category)
  }

  findAll() {
    return this.categoryRepository.find()
  }

  // findByName(name: string) {
  //   return this.categoryRepository.findOne({})
  // }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) {
      throw new NotFoundException('Категории не существует')
    }
    return this.categoryRepository.update(id, updateCategoryDto)
  }

  remove(id: number) {
    return this.categoryRepository.delete(id)
  }
}
