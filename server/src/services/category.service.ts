import { Inject, Injectable } from "@nestjs/common";

import { CategoryRepository } from "../repositories/category.repository";
import { CategoryEntity } from "../models/entities/category.entity";
import { CreateCategoryDto } from "../models/dto/category/create-category.dto";
import { UpdateCategoryDto } from "../models/dto/category/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(@Inject() private repository: CategoryRepository) {}

    getCategories(): Promise<CategoryEntity[]> {
        return this.repository.getCategories()
    }
    getCategoryById(categoryId: string): Promise<CategoryEntity> {
        return this.repository.getCategoryById(categoryId)
    }
    createCategory(input: CreateCategoryDto) {
        return this.repository.createCategory(input)
    }
    updateCategory(input: UpdateCategoryDto) {
        return this.repository.updateCategory(input)
    }
    deleteCategory(categoryId: string) {
        return this.repository.deleteCategory(categoryId)
    }
}