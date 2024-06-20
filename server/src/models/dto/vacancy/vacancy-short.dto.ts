import { Expose } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class VacancyShortDto {
    @Expose()
    @IsUUID()
    id: string
    
    @Expose()
    @IsString()
    name: string

    @Expose()
    @IsString()
    description: string

    @Expose()
    @IsNumber()
    minOrDefaultPaycheck: number

    @Expose()
    @IsNumber()
    @IsOptional()
    maxPaycheck: number

    @Expose()
    @IsDate()
    creationDate: Date

    @Expose()
    @IsNumber()
    views: number
}