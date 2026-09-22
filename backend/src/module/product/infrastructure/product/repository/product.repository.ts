import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entity/product.entity";
import { Repository, ILike } from "typeorm";
import { Category } from "../../category/entity/category.entity";
import { UpdateProductDto } from "../../../dto/product/update.product.dto";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly ProductRepository: Repository<Product>
    ) { }

    async create(entity: Product, category: Category) {
        return await this.ProductRepository.create({
            title: entity.title,
            slug: entity.slug,
            description: entity.description,
            price: entity.price,
            images: entity.images,
            category,
        })
    }

    async save(product: Product) {
        return this.ProductRepository.save(product)
    }

    async findAll(categoryId?: number, search?: string) {
        const whereClause: any = {};
        if (categoryId) {
            whereClause.category = { id: categoryId };
        }
        if (search) {
            whereClause.title = ILike(`%${search}%`);
        }
        
        return await this.ProductRepository.find({
            where: whereClause,
            relations: { category: true }
        });
    }

    async findOne(id: number) {
        return this.ProductRepository.findOne({
            where: { id },
            relations: { category: true }
        })
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return await this.ProductRepository.save(product)
    }

    async remove(id: number) {
        const product = await this.findOne(id);
        if (!product) {
            new NotFoundException("Product not found")
        }
        return await this.ProductRepository.softDelete(id);
    }

}