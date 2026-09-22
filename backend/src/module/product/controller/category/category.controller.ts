import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from '../../../../guards/jwt.accessToken.guard';
import { CreateCategoryDto } from '../../dto/category/category.dto';
import { CategoryService } from '../../service/category/category.service';
import { CategoryMapper } from '../../mapper/category.mapper';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.CategoryService.getAllCategories();
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  async CreateCategory(@Body() dto: CreateCategoryDto) {
    const domain = CategoryMapper.fromDto(dto);
    return this.CategoryService.create(domain);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { name?: string; image?: string },
  ) {
    return this.CategoryService.update(id, data);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.CategoryService.delete(id);
  }
}
