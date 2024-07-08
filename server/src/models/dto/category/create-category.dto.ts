import { IsOptional, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    categoryName: string

    @IsUrl()
    categoryLogoLink: string

    @IsUUID()
    @IsOptional()
    parentCategoryId: string
}