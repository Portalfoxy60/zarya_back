import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

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
}
