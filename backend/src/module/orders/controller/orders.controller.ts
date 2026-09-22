import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  NotFoundException,
  Req,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAccessTokenGuard } from '../../../guards/jwt.accessToken.guard';
import { OrdersService } from '../service/orders.service';
import { UserEntity } from '../../user/infrastructure/entity/user.entity';
import { SimulatePaymentDto } from '../dto/paymentSimulate.dto';
import { Role, Roles } from '../../../decorators/role.decorator';
import { RolesGuard } from '../../../guards/roles.guard';
import { orderStatusUpdateDto } from '../dto/orderStatusUpdate.dto';

@UseGuards(JwtAccessTokenGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderRepo: OrdersService) {}

  @Post()
  async createOrder(@Req() req: Request) {
    const user = req.user as UserEntity;
    const order = await this.orderRepo.createOrder(user.id, user);
    return order;
  }

  @Get()
  async getOrders(@Req() req: Request) {
    const user = req.user as UserEntity;
    const userId = user.id;
    const orders = await this.orderRepo.getOrders(userId);
    if (!orders.length) {
      throw new NotFoundException(`No orders found for user ${userId}`);
    }
    return orders;
  }

  @Get(':orderId')
  async findOne(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Req() req: Request,
  ) {
    const user = req.user as UserEntity;
    const order = await this.orderRepo.getOrder(user.id, orderId);
    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
    return order;
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Patch('/:orderId/status')
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() dto: orderStatusUpdateDto,
  ) {
    return await this.orderRepo.updateStatus(orderId, dto.status);
  }
  @Post('/payments/simulate')
  async paymentSimulate(@Body() dto: SimulatePaymentDto) {
    return await this.orderRepo.simulatePayment(dto.orderId);
  }
}
