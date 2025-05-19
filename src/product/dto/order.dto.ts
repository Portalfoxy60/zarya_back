import { Product } from '../entities/product.entity'
import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator'

interface IProductWithQuantity {
  product: Product
  quantity: number
}

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  street: string

  @IsNumber()
  building: number

  @IsNumber()
  flat: number

  @IsNumber()
  floor: number

  @IsString()
  @IsNotEmpty()
  deliveryTime: string

  @IsArray()
  products: IProductWithQuantity[]
}
