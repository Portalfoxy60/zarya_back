import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { ProfileDto } from 'src/user/dto/profile.dto'
import { IRequestWithUser } from 'src/interfaces/request-with-user.interface'
import { AddressDto } from './dto/address.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: IRequestWithUser) {
    return this.userService.update(req.user.id, updateUserDto)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: IRequestWithUser): Promise<ProfileDto> {
    const user = await this.userService.getProfile(req.user.id)
    return new ProfileDto(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/address')
  async getAddress(@Req() req: IRequestWithUser): Promise<AddressDto> {
    const address = await this.userService.getAddress(req.user.id)
    return new AddressDto(address)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
