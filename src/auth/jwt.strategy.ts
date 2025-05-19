import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const secret = configService.get<string>('ACCESS_TOKEN_SECRET')
    if (!secret) {
      throw new Error('ACCESS_TOKEN_SECRET не определен в env')
    }
    const devMode = configService.get<boolean>('DEVELOPE_MODE') || false
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: devMode,
      secretOrKey: secret,
    })
  }

  async validate(payload: IJwtPayload) {
    const { sub } = payload
    const user = await this.userService.findById(sub)
    if (!user) {
      throw new UnauthorizedException('Токен не валидный')
    }
    return user
  }
}
