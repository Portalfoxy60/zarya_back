import { IsEnum, IsNumber, IsPositive } from 'class-validator'
import { ESubscribeType } from 'src/enums/Subscribes.enum'

export class CreateSubscribeDto {
  @IsEnum(ESubscribeType)
  type: ESubscribeType

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
