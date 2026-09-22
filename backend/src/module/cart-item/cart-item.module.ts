import { Module } from '@nestjs/common';
import { CartItemController } from './controller/cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/infrastructure/product/entity/product.entity';
import { CartItemService } from './service/cart-item.service';
import { CartItem } from './infrastructure/entity/cartItem.entity';
import { CartItemRepository } from './infrastructure/repository/cartItem.repository';
import { ProductRepository } from '../product/infrastructure/product/repository/product.repository';

@Module({
  imports:[TypeOrmModule.forFeature([CartItem,Product])],
  controllers: [CartItemController],
  providers: [CartItemService,CartItemRepository,ProductRepository]
})
export class CartItemModule {}
