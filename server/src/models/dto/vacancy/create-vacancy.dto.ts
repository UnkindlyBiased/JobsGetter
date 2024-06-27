import { IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator"
import { Transform } from "class-transformer"

import { PositionType } from "../../../../utils/types/enums/position-level.type"

export class CreateVacancyDto {
    @IsString({ message: 'Name is either missing or too short' })
    @MinLength(15)
    @Transform(({ value }) => (value as string).trim())
    name: string

    @IsString({ message: 'Description is either missing or too short' })
    @MinLength(25)
    @Transform(({ value }) => (value as string).trim())
    description: string

    @IsOptional()
    @IsEnum(PositionType)
    @Transform(({ value }) => ('' + value).toLowerCase())
    positionLevel: PositionType

    @IsNumber({ maxDecimalPlaces: 6 }, { message: 'Minimal or default paycheck is missing or wrong' })
    minOrDefaultPaycheck: number

    @IsNumber({ maxDecimalPlaces: 6 }, { message: 'Maximal paycheck is wrong' })
    @IsOptional()
    maxPaychek: number
}