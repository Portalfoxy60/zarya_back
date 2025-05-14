import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common'
import { SubscribeService } from './subscribe.service'
import { CreateSubscribeDto } from './dto/create-subscribe.dto'
import { UpdateSubscribeDto } from './dto/update-subscribe.dto'
import { IRequestWithUser } from 'src/interfaces/request-with-user.interface'
import { AuthGuard } from '@nestjs/passport'

@Controller('subscribes')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Req() req: IRequestWithUser,
    @Body() createSubscribeDto: CreateSubscribeDto,
  ) {
    return this.subscribeService.create(req.user, createSubscribeDto)
  }

  @Get()
  findAll() {
    return this.subscribeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribeService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscribeDto: UpdateSubscribeDto,
  ) {
    return this.subscribeService.update(+id, updateSubscribeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscribeService.remove(+id)
  }
}
