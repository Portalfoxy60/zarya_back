import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator'
import { ESubscribeType } from '../../enums/Subscribes.enum'

export class CreateSubscribeDto {
  @IsEnum(ESubscribeType)
  type: ESubscribeType

  @IsString()
  @IsNotEmpty()
  street: string

  @IsNumber()
  @IsPositive()
  building: number

  @IsNumber()
  @IsPositive()
  flat: number

  @IsNumber()
  @IsPositive()
  floor: number

  @IsString()
  @IsNotEmpty()
  deliveryTime: string

  @IsNumber()
  @IsPositive()
  product1Id: number

  @IsNumber()
  @IsPositive()
  product2Id: number

  @IsNumber()
  @IsPositive()
  drinkId: number
}
