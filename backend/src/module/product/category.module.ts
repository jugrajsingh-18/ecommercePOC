import { Module } from "@nestjs/common";
import { CategoryController } from "./controller/category/category.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./infrastructure/category/entity/category.entity";
import { CategoryService } from "./service/category/category.service";
import { CategoryRepository } from "./infrastructure/category/repository/category.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Category]),JwtModule],
    controllers:[CategoryController],
    providers:[CategoryService,CategoryRepository],
    exports:[CategoryRepository]
})

export class CategoryModule {}