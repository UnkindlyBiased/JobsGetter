import { Transform } from "class-transformer"
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, MinLength } from "class-validator"

import { PositionType } from "../../../../utils/types/enums/position-level.type"

export class EditVacancyDto {
    @IsUUID()
    id: string
    
    @IsString({ message: 'Name is either missing or too short' })
    @MinLength(15)
    @Transform(({ value }) => (value as string).trim())
    @IsOptional()
    name: string

    @IsString({ message: 'Description is either missing or too short' })
    @MinLength(25)
    @Transform(({ value }) => (value as string).trim())
    @IsOptional()
    description: string

    @IsOptional()
    @IsEnum(PositionType)
    @Transform(({ value }) => ('' + value).toLowerCase())
    @IsOptional()
    positionLevel: PositionType

    @IsNumber({ maxDecimalPlaces: 6 }, { message: 'Minimal or default paycheck is missing or wrong' })
    @IsOptional()
    minOrDefaultPaycheck: number

    @IsNumber({ maxDecimalPlaces: 6 }, { message: 'Maximal paycheck is wrong' })
    @IsOptional()
    maxPaycheck: number
}