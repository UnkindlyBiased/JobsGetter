import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationParams {
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    page: number = 1

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit: number
}