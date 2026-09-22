import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface NotificationEmailDto {
  name: string;
  email: string;
  title: string;
  message: string;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendNotificationEmail(dto: NotificationEmailDto) {
    try {
      const info = await this.transporter.sendMail({
        from: {
          name: 'NestApp',
          address: this.configService.get('MAIL_FROM'),
        },
        to: dto.email,
        subject: dto.title,
        text: `Hi ${dto.name},\n\n${dto.message}\n\nRegards,\nNestApp Team`,
        html: this.getEmailTemplate(dto.name, dto.title, dto.message),
        headers: {
          'X-Priority': '3',
          'X-Mailer': 'NestApp Mailer',
          'List-Unsubscribe': `<mailto:${this.configService.get('MAIL_FROM')}>`,
        },
      });

      this.logger.log(
        `Email sent to ${dto.email} — MessageId: ${info.messageId}`,
      );
    } catch (error) {
      this.logger.error(`Failed to send email to ${dto.email}`, error);
      throw error;
    }
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      this.logger.log('Mail server connection verified ✅');
    } catch (error) {
      this.logger.error('Mail server connection failed ❌', error);
    }
  }

  private getEmailTemplate(
    name: string,
    title: string,
    message: string,
  ): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:30px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.1);">

                <!-- Header -->
                <tr>
                  <td style="background:#4F46E5; padding:30px; text-align:center;">
                    <h1 style="color:#ffffff; margin:0; font-size:24px;">NestApp</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px;">
                    <h2 style="color:#333333; margin-top:0;">${title}</h2>
                    <p style="color:#333333; font-size:16px;">Hi <strong>${name}</strong>,</p>
                    <p style="color:#555555; font-size:15px; line-height:1.6;">${message}</p>
                    <hr style="border:none; border-top:1px solid #eeeeee; margin:20px 0;">
                    <p style="color:#999999; font-size:13px;">
                      Regards,<br><strong>NestApp Team</strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f8f8f8; padding:20px; text-align:center;">
                    <p style="color:#999999; font-size:12px; margin:0;">
                      This is an automated email from NestApp.<br>
                      If you did not request this, please ignore this email.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }
}
