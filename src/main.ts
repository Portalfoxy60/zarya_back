import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const port = configService.get<number>('PORT') || 3000
  const frontUrl =
    configService.get<string>('FRONT_URL') || 'http://localhost:5173'

  app.use(cookieParser())

  app.enableCors({
    origin: frontUrl,
    credentials: true,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  await app.listen(port)
}
bootstrap()
