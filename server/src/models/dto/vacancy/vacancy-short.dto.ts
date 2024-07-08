import { Expose, plainToInstance, Transform } from "class-transformer";
import { CompanyShortDto } from "../company/company-short.dto";
export class VacancyShortDto {
    @Expose()
    id: string
    
    @Expose()
    name: string

    @Expose()
    description: string

    @Expose()
    minOrDefaultPaycheck: number

    @Expose()
    maxPaycheck: number

    @Expose()
    creationDate: Date

    @Expose()
    views: number

    @Expose()
    @Transform(({ value }) => plainToInstance(CompanyShortDto, value, {
        strategy: 'exposeAll'
    }))
    company: CompanyShortDto
}