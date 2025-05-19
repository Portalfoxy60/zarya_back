import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { MeDto } from './dto/me.dto'
import { IRequestWithUser } from 'src/interfaces/request-with-user.interface'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto)
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const maxAge =
      this.configService.get<number>('ACCESS_TOKEN_SECONDS') || 86400000
    const secure =
      this.configService.get<boolean>('ACCESS_TOKEN_SECURE') || false

    const user = await this.authService.validateCredentials(loginDto)
    const accessToken = this.authService.generateToken(user)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: secure,
      sameSite: 'lax',
      maxAge: maxAge * 1000,
    })
    return new MeDto(user)
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    const secure =
      this.configService.get<boolean>('ACCESS_TOKEN_SECURE') || false

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: secure,
      sameSite: 'lax',
    })

    return { message: 'Success logout' }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: IRequestWithUser): MeDto {
    return new MeDto(req.user)
  }
}
