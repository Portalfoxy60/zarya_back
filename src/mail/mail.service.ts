import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { OrderDto } from 'src/product/dto/order.dto'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcome(to: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Добро пожаловать!',
        template: 'welcome',
        context: {
          name,
        },
      })
    } catch (error) {
      console.error('Ошибка при отправке приветственного письма:', error)
      throw error
    }
  }

  async sendOrder(to: string, orderDto: OrderDto) {
    const { street, building, flat, floor, deliveryTime, products } = orderDto
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Заказ',
        template: 'order',
        context: {
          deliveryTime,
          street,
          building,
          flat,
          floor,
          products,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
}
