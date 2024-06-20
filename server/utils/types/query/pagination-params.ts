import { Expose, Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationParams {
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    @Expose()
    page: number = 1

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    @Expose()
    limit: number
}