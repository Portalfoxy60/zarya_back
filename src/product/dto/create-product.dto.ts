import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsNumber,
  IsPositive,
} from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return (value as string)?.trim()
  })
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsNotEmpty()
  @IsString()
  image: string

  @IsInt()
  @Min(1)
  categoryId: number
}
