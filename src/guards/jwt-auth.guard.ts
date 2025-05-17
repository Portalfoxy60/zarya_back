import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Request {
    const req = context.switchToHttp().getRequest<Request>()

    const cookies = req.cookies as Record<string, string>
    const tokenFromCookie: string | undefined = cookies?.['accessToken']
    const authHeader = req.headers['authorization']

    if (!authHeader && tokenFromCookie) {
      req.headers['authorization'] = `Bearer ${tokenFromCookie}`
    }

    return req
  }
}
