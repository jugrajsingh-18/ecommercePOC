import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "../entity/notification.entity";
import { Repository } from "typeorm";
import { CreateNotificationDto } from "../../dto/createNotifiaction.dto";

@Injectable()
export class NotificationRepository{
    constructor(
        @InjectRepository(Notification)
        private readonly NotificationRepository : Repository<Notification>
    ){}
    
    async create(dto: CreateNotificationDto){
    return await this.NotificationRepository.create(dto);
    }
    async save(notification:Notification){
         return await this.NotificationRepository.save(notification);
    }
    async findAll(userId: string){
        return await this.NotificationRepository.find({
            where:{userId:userId},
            order: { createdAt: 'DESC' }
        })
    }
    async findAllUnRead(userId:string){
         return await this.NotificationRepository.find({
            where:{userId:userId,isRead:false},
            order: { createdAt: 'DESC' }
        })
    }
    async findOne(userId:string,notificationId:number){
        return await this.NotificationRepository.findOne({
            where:{
                id:notificationId,
                userId:userId,
            }
        })
    }
    async updateReadToTrue(userId:string,notificationId:number){
        const response =await this.findOne(userId,notificationId)
        response.isRead =true
        return await this.save(response)
    }
    async updateAllReadToTrue(userId: string){
        return await this.NotificationRepository.update(
            { userId: userId, isRead: false },
            { isRead: true }
        )
    }
     async delete(id:number){
        return await this.NotificationRepository.delete(id)
    }
}