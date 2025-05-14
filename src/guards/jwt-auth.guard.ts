import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: unknown,
    user: User,
    info: unknown,
    context: ExecutionContext,
  ): TUser {
    const req = context.switchToHttp().getRequest<Request>()

    if (!req.headers.authorization && req.cookies?.accessToken) {
      req.headers.authorization = `Bearer ${req.cookies.accessToken}`
    }

    return super.handleRequest(err, user, info, context)
  }
}
