import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/category/repository/category.repository';
import { CategoryDomain } from '../../domain/category.domain';
import { CategoryMapper } from '../../mapper/category.mapper';
import { CategoryResponseDto } from '../../dto/category/category.response.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async create(domain: CategoryDomain): Promise<CategoryResponseDto> {
    const entity = CategoryMapper.toEntity(domain);
    const category = await this.CategoryRepository.create(entity);
    const response = await this.CategoryRepository.save(category);
    return CategoryMapper.toResponse(CategoryMapper.fromEntity(response));
  }

  async getAllCategories(): Promise<CategoryResponseDto[]> {
    const response = await this.CategoryRepository.findAll();
    return response.map((res) =>
      CategoryMapper.toResponse(CategoryMapper.fromEntity(res)),
    );
  }

  async update(categoryId: number, data: { name?: string; image?: string }): Promise<CategoryResponseDto | null> {
    const result = await this.CategoryRepository.update(categoryId, data);
    if (!result) return null;
    return CategoryMapper.toResponse(CategoryMapper.fromEntity(result));
  }

  async delete(categoryId: number) {
    return this.CategoryRepository.delete(categoryId);
  }
}
