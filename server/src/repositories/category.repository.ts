import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CategoryEntity } from "../models/entities/category.entity";
import { CreateCategoryDto } from "../models/dto/category/create-category.dto";
import { UpdateCategoryDto } from "../models/dto/category/update-category.dto";

@Injectable()
export class CategoryRepository {
    constructor(@InjectRepository(CategoryEntity) private categoryRep: Repository<CategoryEntity>) {}

    async getCategories(): Promise<CategoryEntity[]> {
        return this.categoryRep.find()
    }
    async getCategoryById(id: string) {
        const entity = await this.categoryRep.findOne({
            where: { id },
            relations: ['children']
        })
        if (!entity) {
            throw new NotFoundException('Category with such ID does not exist')
        }

        return entity
    }
    async createCategory(input: CreateCategoryDto): Promise<void> {
        const isExisting = await this.categoryRep.existsBy([
            { categoryName: ILike(input.categoryName) }
        ])
        if (input.parentCategoryId) {
            const isParentExisting = await this.categoryRep.existsBy({ id: input.parentCategoryId })
            if (!isParentExisting) {
                throw new NotFoundException('Such parent category does not exist')
            }
        }
        if (isExisting) {
            throw new ConflictException('Category with this data exists')
        }

        const { parentCategoryId, ...rest } = input

        const entity = this.categoryRep.create({
            ...rest,
            parent: {
                id: input.parentCategoryId
            }
        })
        await this.categoryRep.insert(entity)
    }
    async updateCategory(input: UpdateCategoryDto) {
        const isExisting = await this.categoryRep.existsBy({ id: input.id })
        if (!isExisting) {
            throw new NotFoundException("Such category does not exist")
        }

        const { id, ...rest } = input
        await this.categoryRep.update(id, rest)
    }
    async deleteCategory(id: string) {
        const isExisting = await this.categoryRep.existsBy({ id })
        if (!isExisting) {
            throw new NotFoundException('This category does not exist')
        }

        const entity = this.categoryRep.create({ id })

        await this.categoryRep.remove(entity)
    }
}