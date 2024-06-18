import { IsOptional, IsString } from "class-validator"
import { Vacancy } from "../../domain/vacancy.model"
import { PositionType } from "../../../../utils/types/PositionType"

export class CreateVacancyDto {
    @IsString()
    name: string

    @IsOptional()
    positionLevel: PositionType
}