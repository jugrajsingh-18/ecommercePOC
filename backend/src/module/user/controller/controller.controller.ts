import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../service/service.service';
import { RolesGuard } from '../../../guards/roles.guard';
import { JwtAccessTokenGuard } from '../../../guards/jwt.accessToken.guard';
import { Role, Roles } from '../../../decorators/role.decorator';
import {
  AdminQueryOrderSummaryDto,
  AdminQueryUserDto,
} from '../dto/adminPagination.dto';
@Controller('users')
@UseGuards(JwtAccessTokenGuard, RolesGuard)
@Roles(Role.Admin)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/test')
  checkAdmin() {
    const response = {
      message: 'Hello Admin welcome to the admin portal',
    };
    return response;
  }
  @Get('users')
  async getUsers(@Query() query: AdminQueryUserDto) {
    return await this.userService.getUsers(query);
  }

  @Get('orders')
  async getAllOrders(@Query() query: AdminQueryOrderSummaryDto) {
    return await this.userService.getAllOrders(query);
  }

  @Get('orders/summary')
  async getOrdersSummary(@Query() query: AdminQueryOrderSummaryDto) {
    return await this.userService.getOrdersSummary(query);
  }

  @Get('products/summary')
  async getProductsSummary() {
    return await this.userService.getProductsSummary();
  }
}
