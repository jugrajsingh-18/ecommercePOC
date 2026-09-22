import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAccessTokenGuard } from '../../../../guards/jwt.accessToken.guard';
import { CreateProductDto } from '../../dto/product/product.dto';
import { ProductService } from '../../service/product/product.service';
import { UpdateProductDto } from '../../dto/product/update.product.dto';
import { ProductMapper } from '../../mapper/product.mapper';
import { CategoryRepository } from '../../infrastructure/category/repository/category.repository';
import { Category } from '../../infrastructure/category/entity/category.entity';
import { CategoryDomain } from '../../domain/category.domain';
import { CategoryMapper } from '../../mapper/category.mapper';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryRepository: CategoryRepository,
  ) { }
  private dollarToRupee = (price: number) => {
    return price * 96
  }
  @Post('/seed')
  async seedDatabase() {
    // Fetch categories
    const catRes = await fetch('https://api.escuelajs.co/api/v1/categories');
    const categories = await catRes.json();

    for (const cat of categories) {
      try {
        // check if category exists
        const exists = await this.categoryRepository.findOne(cat.id);
        if (!exists) {
          const domain = new CategoryDomain(cat);
          await this.categoryRepository.save(CategoryMapper.toEntity(domain));
        }
      } catch (e) {
        console.error('Failed to seed category', cat.id, e);
      }
    }

    // Fetch products
    const prodRes = await fetch('https://api.escuelajs.co/api/v1/products');
    const products = await prodRes.json();

    for (const prod of products) {
      try {

        const dto: CreateProductDto = {
          title: prod.title,
          slug:
            prod.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') +
            '-' +
            prod.id,
          description: prod.description,
          price: this.dollarToRupee(prod.price),
          images:
            prod.images && prod.images.length
              ? prod.images
              : ['https://placehold.co/600x400'],
          categoryId: prod.category.id,
        };
        const domain = ProductMapper.fromDto(dto);
        // Overwrite id to match escuelajs so that category mapping is easy if needed, but here id is auto-generated in our DB.
        // Wait, our DB has auto-generated IDs. It's fine, the categoryId will map to the imported category IDs which we forced.
        await this.productService.create(domain);
      } catch (e) {
        console.error('Failed to seed product', prod.id, e);
      }
    }

    return { message: 'Seed complete' };
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post('/add-product')
  async addProduct(@Body() dto: CreateProductDto, @Req() req: Request) {
    const domain = ProductMapper.fromDto(dto);
    const response = await this.productService.create(domain);
    return response;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return await this.productService.update(id, dto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }

  @Get()
  async getAllProducts(@Req() req: Request) {
    const categoryId = req.query.categoryId
      ? parseInt(req.query.categoryId as string, 10)
      : undefined;
    const search = req.query.search as string;
    return await this.productService.findAll(categoryId, search);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.remove(id);
  }
}
