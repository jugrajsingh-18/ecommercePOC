import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAccessTokenGuard } from "../../../guards/jwt.accessToken.guard";
import { NotificationService } from "../service/notification.service";
import { CreateNotificationDto } from "../dto/createNotifiaction.dto";
import type { Request } from "express";
import { UserEntity } from "../../user/infrastructure/entity/user.entity";

@UseGuards(JwtAccessTokenGuard)
@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationsService: NotificationService) { }

    @Post()
    create(@Body() dto: CreateNotificationDto) {
        return this.notificationsService.create(dto);
    }

    @Get()
    findAll(@Req() req: Request) {
        const user = req.user as UserEntity
        const userId = user.id
        return this.notificationsService.findAll(userId);
    }
    @Get('unread')
    findAllUnRead(@Req() req: Request) {
        const user = req.user as UserEntity
        const userId = user.id
        return this.notificationsService.findAllUnRead(userId);
    }

    @Get(':notificationId')
    async findOne(@Req() req: Request, @Param('notificationId', ParseIntPipe) notificationId: number) {
        const user = req.user as UserEntity
        const userId = user.id
        return this.notificationsService.findOne(userId, notificationId)
    }

    @Patch('read-all')
    async markAllAsRead(@Req() req: Request) {
        const user = req.user as UserEntity;
        const userId = user.id;
        return this.notificationsService.markAllAsRead(userId);
    }

    @Patch(':notificationId/read')
    async markAsRead(
        @Param('notificationId', ParseIntPipe) notificationId: number,
        @Req() req: Request

    ) {
        const user = req.user as UserEntity
        const userId = user.id
        return this.notificationsService.markAsRead(userId, notificationId);
    }

    @Delete(':notificationId')
    async Delete(@Req() req: Request, @Param('notificationId', ParseIntPipe) notificationId: number) {
        const user = req.user as UserEntity
        const userId = user.id
        return await this.notificationsService.delete(userId, notificationId)
    }

}