import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoryController } from "../../../controllers/category.controller";
import { CategoryService } from "../../../services/category.service";
import { CategoryRepository } from "../../../repositories/category.repository";
import { CategoryEntity } from "../../../models/entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository]
})
export class CategoryModule {}