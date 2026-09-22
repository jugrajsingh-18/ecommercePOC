import { Module } from '@nestjs/common';
import { OrdersController } from './controller/orders.controller';
import { OrdersService } from './service/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/infrastructure/product/entity/product.entity';
import { Order } from './infrastructure/entity/order.entity';
import { OrderItem } from './infrastructure/entity/orderItem.entity';
import { orderRepository } from './infrastructure/repository/order.repository';
import { CartItem } from '../cart-item/infrastructure/entity/cartItem.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product,CartItem,Order,OrderItem])],
  controllers: [OrdersController],
  providers: [OrdersService,orderRepository]
})
export class OrdersModule {}
