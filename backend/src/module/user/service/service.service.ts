import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { AdminMapper } from '../mapper/admin.mapper';
import { PaginatedUsersDomain } from '../domain/admin.domain';
import { Order } from '../../orders/infrastructure/entity/order.entity';
import { OrderItem } from '../../orders/infrastructure/entity/orderItem.entity';
import { AdminQueryOrderSummaryDto, AdminQueryUserDto, PaginatedUserResponseDto } from '../dto/adminPagination.dto';
import { Product } from '../../product/infrastructure/product/entity/product.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, FindOptionsWhere } from 'typeorm';
import { UserEntity } from '../infrastructure/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource 
  ) {}

  async getUsers(query: AdminQueryUserDto): Promise<PaginatedUserResponseDto> {
    const result = await this.userRepository.findAndCount(query);

    const domainData = result.data.map(entity => AdminMapper.toUserDomain(entity as UserEntity));
    const paginatedDomain = new PaginatedUsersDomain(domainData, result.meta);

    return AdminMapper.toPaginatedUserResponseDto(paginatedDomain);
  }

  async getOrdersSummary(query: AdminQueryOrderSummaryDto) {
    const queryBuilder = this.dataSource.getRepository(Order).createQueryBuilder('order');

    if (query.startDate) {
      queryBuilder.andWhere('order.createdAt >= :startDate', { startDate: query.startDate });
    }
    if (query.endDate) {
      queryBuilder.andWhere('order.createdAt <= :endDate', { endDate: query.endDate });
    }

    const totalOrders = await queryBuilder.getCount();

    const revenueResult = await queryBuilder
      .select('SUM(order.totalAmount)', 'revenue')
      .getRawOne();
    
    const revenue = Number(revenueResult?.revenue) || 0;

    const groupedByStatus = await queryBuilder
      .select('order.status', 'status')
      .addSelect('COUNT(order.id)', 'count')
      .groupBy('order.status')
      .getRawMany();

    return {
      totalOrders,
      revenue,
      byStatus: groupedByStatus.map(item => ({
        status: item.status,
        count: Number(item.count),
      })),
    };
  }

  async getAllOrders(query?: AdminQueryOrderSummaryDto) {
    const orderRepo = this.dataSource.getRepository(Order);
    const whereClause: FindOptionsWhere<Order> = {};
    if (query?.startDate && query?.endDate) {
      whereClause.createdAt = Between(new Date(query.startDate), new Date(query.endDate + 'T23:59:59.999Z'));
    } else if (query?.startDate) {
      whereClause.createdAt = MoreThanOrEqual(new Date(query.startDate));
    } else if (query?.endDate) {
      whereClause.createdAt = LessThanOrEqual(new Date(query.endDate + 'T23:59:59.999Z'));
    }

    const orders = await orderRepo.find({
      where: whereClause,
      relations: { user: true, items: { product: true } },
      order: { createdAt: 'DESC' },
    });
    return orders;
  }

  async getProductsSummary() {
    const productRepo = this.dataSource.getRepository(Product);
    const orderItemRepo = this.dataSource.getRepository(OrderItem);

    const totalProducts = await productRepo.count();

    let outOfStockCount = 0;
    try {
       outOfStockCount = await productRepo
         .createQueryBuilder('product')
         .where('product.availableQuantity <= :stockAmount', { stockAmount: 0 })
         .getCount(); 
    } catch (error) {
       console.warn('availableQuantity column likely missing from Product entity. Returning 0 for outOfStockCount.');
    }

    const mostOrdered = await orderItemRepo
      .createQueryBuilder('oi')
      .innerJoin('oi.product', 'product')
      .select('product.id', 'id')
      .addSelect('product.title', 'title')
      .addSelect('SUM(oi.quantity)', 'totalSold')
      .groupBy('product.id')
      .addGroupBy('product.title')
      .orderBy('SUM(oi.quantity)', 'DESC')
      .limit(5)
      .getRawMany();

    return {
      totalProducts,
      outOfStockCount,
      mostOrdered: mostOrdered.map(item => ({
        id: item.id,
        title: item.title,
        totalSold: Number(item.totalSold),
      })),
    };
  }
}