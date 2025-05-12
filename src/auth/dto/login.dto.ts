import { IsNotEmpty, IsEmail, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => {
    return (value as string)?.toLowerCase().trim()
  })
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
