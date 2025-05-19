import { Injectable } from '@nestjs/common'
import {
  addDays,
  eachDayOfInterval,
  isWeekend,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns'

@Injectable()
export class DateService {
  private toLocalStartOfDay(date: Date): Date {
    return setMilliseconds(setSeconds(setMinutes(setHours(date, 0), 0), 0), 0)
  }

  getWeekDates(): Date[] {
    const start = this.toLocalStartOfDay(addDays(new Date(), 1))
    const end = this.toLocalStartOfDay(addDays(start, 6))
    const days = eachDayOfInterval({ start, end })

    return days
  }

  getWeekendDaysOfMonth(): Date[] {
    const start = this.toLocalStartOfDay(addDays(new Date(), 1))
    const end = this.toLocalStartOfDay(addDays(start, 30))
    const days = eachDayOfInterval({ start, end })

    return days.filter((day) => isWeekend(day))
  }

  getWeekdaysOfMonth(): Date[] {
    const start = this.toLocalStartOfDay(addDays(new Date(), 1))
    const end = this.toLocalStartOfDay(addDays(start, 30))
    const days = eachDayOfInterval({ start, end })

    return days.filter((day) => !isWeekend(day))
  }

  getMonthDates(): Date[] {
    const start = this.toLocalStartOfDay(addDays(new Date(), 1))
    const end = this.toLocalStartOfDay(addDays(start, 30))
    const days = eachDayOfInterval({ start, end })

    return days
  }
}
