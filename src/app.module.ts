import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
