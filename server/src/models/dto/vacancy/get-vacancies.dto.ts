import { Expose, Transform, Type, plainToInstance } from "class-transformer";

import { VacancyShortDto } from "./vacancy-short.dto";
import { VacancyEntity } from "../../entities/vacancy.entity";

export class GetVacanciesDto {
    @Expose()
    @Transform(({ value }) => (value as VacancyEntity[]).forEach((elem) => plainToInstance(VacancyShortDto, elem)))
    vacancies: Array<VacancyEntity>

    @Expose()
    page: number

    @Expose()
    limit: number
}