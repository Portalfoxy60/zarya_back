import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { SubscribeModule } from './subscribe/subscribe.module';
import { DateModule } from './date/date.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    SubscribeModule,
    DateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
