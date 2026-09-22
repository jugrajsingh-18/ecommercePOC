import {
    Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';

export enum NotificationType {
    ORDER = 'order',
    PAYMENT = 'payment',
    SYSTEM = 'system',
    ALERT = 'alert',
}

@Entity('notifications')
export class Notification {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column('text')
    message: string;

    @Column({
        type: 'enum',
        enum: NotificationType,
        default: NotificationType.SYSTEM,
    })
    type: NotificationType;

    @Column({ default: false })
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;
}