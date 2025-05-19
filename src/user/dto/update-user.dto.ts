import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { UpdateAddressDto } from './update-address.dto'

export class UpdateUserDto extends PartialType(RegisterDto) {
  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  confirmPassword?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto
}
