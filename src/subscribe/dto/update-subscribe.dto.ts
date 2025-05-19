import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateSubscribeDto } from './create-subscribe.dto'
import { IsEnum, IsOptional } from 'class-validator'
import { ESubscribeStatus } from 'src/enums/SubscribeStatus.enum'

export class UpdateSubscribeDto extends PartialType(
  OmitType(CreateSubscribeDto, ['type'] as const),
) {
  @IsOptional()
  @IsEnum(ESubscribeStatus)
  status: ESubscribeStatus
}
