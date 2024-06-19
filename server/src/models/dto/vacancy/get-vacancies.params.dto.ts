import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class GetVacanciesParams {
    @IsString()
    @IsOptional()
    search: string = ''

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page: number = 1

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit: number
}