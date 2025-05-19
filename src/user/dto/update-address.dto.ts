import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator'

export class UpdateAddressDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  street?: string

  @IsInt()
  @IsPositive()
  @IsOptional()
  building?: number

  @IsInt()
  @IsPositive()
  @Min(1)
  @IsOptional()
  flat?: number

  @IsInt()
  @IsPositive()
  @Min(1)
  @IsOptional()
  floor?: number
}
