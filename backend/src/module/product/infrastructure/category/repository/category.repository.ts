import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../../../dto/category/category.dto';
import { CategoryMapper } from '../../../mapper/category.mapper';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
  ) {}
  async create(dto: CreateCategoryDto) {
    return await this.CategoryRepository.create(dto);
  }

  async save(category: Category) {
    return await this.CategoryRepository.save(category);
  }

  async findAll() {
    return await this.CategoryRepository.find();
  }
  async findOne(categoryId: number) {
    return await this.CategoryRepository.findOne({
      where: { id: categoryId },
    });
  }

  async update(categoryId: number, data: Partial<Category>) {
    const category = await this.findOne(categoryId);
    if (!category) return null;
    Object.assign(category, data);
    return await this.CategoryRepository.save(category);
  }

  async delete(categoryId: number) {
    return await this.CategoryRepository.delete(categoryId);
  }
}
