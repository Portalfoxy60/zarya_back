import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { existsSync, mkdirSync } from 'fs'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid'

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: (req, file, cb) => {
            const uploadPath = configService.get<string>('UPLOAD_PATH')
            if (!uploadPath) {
              throw new Error('UPLOAD_PATH is not defined in .env')
            }
            if (!existsSync(uploadPath)) {
              mkdirSync(uploadPath, { recursive: true })
            }
            cb(null, uploadPath)
          },
          filename: (req, file, cb) => {
            const ext = extname(file.originalname)
            cb(null, `${uuidv4()}${ext}`)
          },
        }),
      }),
    }),
  ],
  exports: [MulterModule],
})
export class UploadModule {}
