import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";

import { CategoryService } from "../services/category.service";
import { CategoryEntity } from "../models/entities/category.entity";
import { Public } from "../../utils/decorators/public.decorator";
import { Roles } from "../../utils/decorators/roles.decorator";
import { UserRoles } from "../../utils/types/enums/user-roles.enum";
import { CreateCategoryDto } from "../models/dto/category/create-category.dto";
import { ResponseMessage } from "../../utils/decorators/response-message.decorator";
import { UpdateCategoryDto } from "../models/dto/category/update-category.dto";

@Roles(UserRoles.ADMIN)
@Controller('categories')
export class CategoryController {
    constructor(@Inject() private service: CategoryService) {}

    @Get()
    @Public()
    getCategories(): Promise<CategoryEntity[]> {
        return this.service.getCategories()
    }

    @Get(':id')
    @Public()
    getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.getCategoryById(id)
    }

    @Post()
    @ResponseMessage('Category was successfully created')
    createCategory(@Body() input: CreateCategoryDto) {
        return this.service.createCategory(input)
    }

    @Put()
    @ResponseMessage("Category's data was successfully updated")
    updateCategory(@Body() input: UpdateCategoryDto) {
        return this.service.updateCategory(input)
    }

    @Delete()
    @ResponseMessage('Category and its children were successfully deleted')
    deleteCategory(@Body('id', ParseUUIDPipe) id: string) {
        return this.service.deleteCategory(id)
    }
}