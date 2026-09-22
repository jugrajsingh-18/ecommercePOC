import { IsString, IsInt, IsEnum, IsOptional } from 'class-validator';
import { NotificationType } from '../infrastructure/entity/notification.entity';

export class CreateNotificationDto {

  @IsInt()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType = NotificationType.SYSTEM;


}