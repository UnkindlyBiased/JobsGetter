
import { IsBooleanString, IsOptional, IsString } from "class-validator";

export class GetVacanciesParams {
    @IsString()
    @IsOptional()
    search: string = ''

    @IsBooleanString()
    @IsOptional()
    all: string = 'false'
}