import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./infrastructure/entity/notification.entity";
import { Module } from "@nestjs/common";
import { NotificationController } from "./controller/notification.controller";
import { NotificationService } from "./service/notification.service";
import { NotificationRepository } from "./infrastructure/repository/notification.repository";
import { MailService } from "../mail/service/mail.service";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    MailModule
  ],
  controllers: [NotificationController],
  providers: [NotificationService,NotificationRepository,MailService],
  exports: [NotificationService],
})
export class NotificationsModule {}