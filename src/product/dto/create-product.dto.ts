import { Transform, Type } from 'class-transformer'
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

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryId: number
}
