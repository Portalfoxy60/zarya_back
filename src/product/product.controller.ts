import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductService } from './product.service'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { IRequestWithUser } from 'src/interfaces/request-with-user.interface'
import { OrderDto } from './dto/order.dto'

@Controller('products')
export class ProductController {
  constructor(
    private readonly configService: ConfigService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.create(createProductDto, file.filename)
  }

  @Get()
  findAll() {
    return this.productService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Post('/order')
  async order(@Req() req: IRequestWithUser, @Body() orderDto: OrderDto) {
    return await this.productService.order(req.user.email, orderDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id)
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.update(+id, updateProductDto, file.filename)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id)
  }
}
