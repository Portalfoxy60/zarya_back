import { Controller, Get } from '@nestjs/common'
import { DateService } from './date.service'

@Controller('dates')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Get('/week')
  getWeekDates() {
    return this.dateService.getWeekDates()
  }
  @Get('/weekdays')
  getWeekdaysDates() {
    return this.dateService.getWeekdaysOfMonth()
  }
  @Get('/weekends')
  getWeekendsDates() {
    return this.dateService.getWeekendDaysOfMonth()
  }
  @Get('/month')
  getMonthDates() {
    return this.dateService.getMonthDates()
  }
}
