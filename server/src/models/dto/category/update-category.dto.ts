import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateCategoryDto {
    @IsUUID()
    id: string

    @IsString()
    @IsOptional()
    categoryName: string
}