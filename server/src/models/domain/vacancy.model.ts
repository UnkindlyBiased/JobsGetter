import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'
import { Transform } from 'class-transformer'

import { PositionType } from '../../../utils/types/position-level.type'

export class Vacancy {
    @IsUUID()
    id: string

    @IsString()
    name: string

    @IsOptional()
    @IsEnum(PositionType)
    @Transform(({ value }) => ('' + value).toLowerCase())
    positionLevel: PositionType
}