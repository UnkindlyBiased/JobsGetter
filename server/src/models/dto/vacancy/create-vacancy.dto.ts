import { Transform } from "class-transformer"
import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator"

import { PositionType } from "../../../../utils/types/PositionType"

export class Vacancy {
    @IsUUID()
    id: string

    @IsString()
    name: string

    @IsOptional()
    @IsEnum(PositionType)
    @Transform(({ value }) => ('' + value).toLowerCase())
    experience: PositionType
}