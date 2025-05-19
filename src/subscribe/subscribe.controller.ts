import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { IRequestWithUser } from 'src/interfaces/request-with-user.interface'
import { CreateSubscribeDto } from './dto/create-subscribe.dto'
import { UpdateSubscribeDto } from './dto/update-subscribe.dto'
import { SubscribeService } from './subscribe.service'
import { subscribeDetails } from 'src/enums/Subscribes.enum'

@Controller('subscribes')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: IRequestWithUser,
    @Body() createSubscribeDto: CreateSubscribeDto,
  ) {
    return this.subscribeService.create(req.user, createSubscribeDto)
  }

  @Get('details')
  getDetails() {
    return subscribeDetails
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: IRequestWithUser) {
    return this.subscribeService.findAll(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/current')
  currentSubscribe(@Req() req: IRequestWithUser) {
    return this.subscribeService.current(req.user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribeService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  update(
    @Body() updateSubscribeDto: UpdateSubscribeDto,
    @Req() req: IRequestWithUser,
  ) {
    return this.subscribeService.update(req.user.id, updateSubscribeDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  remove(@Req() req: IRequestWithUser) {
    return this.subscribeService.remove(req.user.id)
  }
}
