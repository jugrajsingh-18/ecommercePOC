import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './infrastructure/product/entity/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { Category } from './infrastructure/category/entity/category.entity';
import { ProductController } from './controller/product/product.controller';
import { ProductService } from './service/product/product.service';
import { ProductRepository } from './infrastructure/product/repository/product.repository';
import { CategoryRepository } from './infrastructure/category/repository/category.repository';

@Module({
  imports:[  TypeOrmModule.forFeature([Product,Category]),JwtModule],
  controllers: [ProductController],
  providers: [ProductService,ProductRepository,CategoryRepository]
})
export class ProductModule {}
