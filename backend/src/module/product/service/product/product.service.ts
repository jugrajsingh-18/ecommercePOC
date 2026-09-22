import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../infrastructure/product/entity/product.entity';
import { Category } from '../../infrastructure/category/entity/category.entity';
import { CreateProductDto } from '../../dto/product/product.dto';
import { UpdateProductDto } from '../../dto/product/update.product.dto';
import { ProductRepository } from '../../infrastructure/product/repository/product.repository';
import { CategoryRepository } from '../../infrastructure/category/repository/category.repository';
import { ProductDomain } from '../../domain/product.domain';
import { ProductMapper } from '../../mapper/product.mapper';
import { ProductResponseDto } from '../../dto/product/product.response.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(domain: ProductDomain): Promise<ProductResponseDto> {
    const entity = ProductMapper.toEntity(domain);
    const category = await this.categoryRepository.findOne(domain.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const product = await this.productRepository.create(entity, category);
    const response = await this.productRepository.save(product);
    const res = ProductMapper.fromEntity(response);
    return ProductMapper.toResponse(res);
  }

  async findAll(categoryId?: number, search?: string): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.findAll(categoryId, search);
    return products.map((product) =>
      ProductMapper.toResponse(ProductMapper.fromEntity(product)),
    );
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return ProductMapper.toResponse(ProductMapper.fromEntity(product));
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productRepository.update(id, updateProductDto);
    return ProductMapper.toResponse(ProductMapper.fromEntity(product));
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.remove(id);
    return;
  }
}
