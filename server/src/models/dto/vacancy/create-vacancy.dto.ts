import { IsOptional, IsString } from "class-validator"
import { Expose } from "class-transformer"

import { PositionType } from "../../../../utils/types/position-level.type"

export class CreateVacancyDto {
    @IsString()
    @Expose()
    name: string

    @IsOptional()
    @Expose()
    positionLevel: PositionType
}