import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { DatabaseModule } from './database/database.module'
import { DateModule } from './date/date.module'
import { MailModule } from './mail/mail.module'
import { ProductModule } from './product/product.module'
import { SubscribeModule } from './subscribe/subscribe.module'
import { UploadModule } from './upload/upload.module'
import { UserModule } from './user/user.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uploadPath = configService.get<string>('UPLOAD_PATH')
        if (!uploadPath) {
          throw new Error('UPLOAD_PATH is not defined')
        }
        return [
          {
            rootPath: join(__dirname, '..', uploadPath),
            serveRoot: '/static',
          },
        ]
      },
    }),
    DatabaseModule,
    AuthModule,
    UploadModule,
    UserModule,
    ProductModule,
    CategoryModule,
    SubscribeModule,
    DateModule,
    UploadModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
