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
import { subscrieDetails } from 'src/enums/Subscribes.enum'

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
    return subscrieDetails
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
