import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from '../../../guards/jwt.accessToken.guard';
import { CreateCartItemDto, UpdateCartItemDto } from '../dto/cartItem.dto';
import type { Request } from 'express';
import { CartItemService } from '../service/cart-item.service';

export interface AuthenticatedRequest extends Request {
  user: { id: string; role?: string };
}

@Controller('cartItem')
@UseGuards(JwtAccessTokenGuard)
export class CartItemController {
  constructor(private readonly cartService: CartItemService) { }

  @Post()
  async addToCart(
    @Body() dto: CreateCartItemDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;

    return this.cartService.addToCart(userId, dto);
  }

  @Get()
  async getCart(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;

    return this.cartService.getCart(userId);
  }

  @Patch(':id')
  async updateQuantity(
    @Param('id', ParseIntPipe) cartItemId: number,
    @Body() dto: UpdateCartItemDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;

    return await this.cartService.updateQuantity(userId, cartItemId, dto);
  }

  @Delete(':id')
  async removeItem(
    @Param('id', ParseIntPipe) cartItemId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;

    return this.cartService.removeItem(userId, cartItemId);
  }

  @Delete()
  async clearCart(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;

    return this.cartService.clearCart(userId);
  }
}
