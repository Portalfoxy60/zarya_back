import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return (value as string)?.trim()
  })
  firstname: string

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return (value as string)?.trim()
  })
  lastname: string

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => {
    return (value as string)?.toLowerCase().trim()
  })
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  confirmPassword: string

  @IsPhoneNumber()
  @Transform(({ value }) => {
    return (value as string)?.trim()
  })
  phone: string
}
