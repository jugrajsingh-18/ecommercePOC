import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { jwtAccessTokenStrategy } from './strategies/jwt.accessTOken.strategy';
import { jwtRefreshTokenStrategy } from './strategies/jwt.refreshToken.strategy';
import { ProductModule } from './module/product/product.module';
import { CategoryModule } from './module/product/category.module';
import { CartItemModule } from './module/cart-item/cart-item.module';
import { OrdersModule } from './module/orders/orders.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './module/notification/notification.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    CartItemModule,
    OrdersModule,
    EventEmitterModule.forRoot(),
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, jwtAccessTokenStrategy, jwtRefreshTokenStrategy],
})
export class AppModule {}
