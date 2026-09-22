import { Injectable, NotFoundException, Param, ParseIntPipe, Req } from "@nestjs/common";
import { NotificationRepository } from "../infrastructure/repository/notification.repository";
import { CreateNotificationDto } from "../dto/createNotifiaction.dto";
import { MailService } from "../../mail/service/mail.service";
import { OnEvent } from "@nestjs/event-emitter";
import { NOTIFICATION_EVENTS, OrderPlacedEvent, OrderUpdatedEvent } from "../../../events/notification.events";
import { NotificationType } from "../infrastructure/entity/notification.entity";

@Injectable()
export class NotificationService{
    constructor(
        private readonly NotificationRepository :NotificationRepository,
        private mailService: MailService,
    ){}
    async create(dto:CreateNotificationDto){
        const notification = await this.NotificationRepository.create(dto)
        return await this.NotificationRepository.save(notification)
    }

    async findAll(userId:string){
        return this.NotificationRepository.findAll(userId)
    }
    async findAllUnRead(userId:string){
      
        return this.NotificationRepository.findAllUnRead(userId)
    }
    async findOne(userId:string,notificationId:number){
        
        return this.NotificationRepository.findOne(userId,notificationId)
    }
    async markAsRead(userId:string,notificationId:number){
        return this.NotificationRepository.updateReadToTrue(userId,notificationId)
    }

    async markAllAsRead(userId: string) {
        return this.NotificationRepository.updateAllReadToTrue(userId);
    }

    async delete(userId:string,notificationId:number){
        const notification =  await this.NotificationRepository.findOne(userId,notificationId)
        if (!notification) throw new NotFoundException('Notification not found');
        return await this.NotificationRepository.delete(notificationId)
    }

 @OnEvent(NOTIFICATION_EVENTS.ORDER_PLACED)
  async handleOrderPlaced(event: OrderPlacedEvent) {

    const response = await this.create({
      userId:  event.userId,
      title:   '🛍️ Order Placed Successfully!',
      message: `Your order #${event.orderId} worth ₹${event.orderTotal} has been placed.`,
      type:    NotificationType.ORDER,
    });

     await this.mailService.sendNotificationEmail({
      name:    event.userName,
      email:   event.userEmail,
      title:   'Order Placed Successfully!',
      message: `Your order #${event.orderId} worth ₹${event.orderTotal} has been placed successfully. We will notify you when it ships!`,
    });
  }

  @OnEvent(NOTIFICATION_EVENTS.ORDER_UPDATED)
  async handleOrderUpdated(event: OrderUpdatedEvent) {
    const response = await this.create({
      userId:  event.userId,
      title:   '🔄 Order Status Updated!',
      message: `The status of your order #${event.orderId} has been updated to ${event.status}.`,
      type:    NotificationType.ORDER,
    });

    await this.mailService.sendNotificationEmail({
      name:    event.userName,
      email:   event.userEmail,
      title:   'Order Status Updated!',
      message: `The status of your order #${event.orderId} has been updated to ${event.status}.`,
    });
  }
}