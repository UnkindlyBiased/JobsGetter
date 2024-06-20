import { Injectable, Logger } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { VacancyRepository } from "../repositories/vacancy.repository";
import { CreateVacancyDto } from "../models/dto/vacancy/create-vacancy.dto";
import { GetVacanciesParams } from "../models/dto/vacancy/get-vacancies.params.dto";
import { VacancyShortDto } from "../models/dto/vacancy/vacancy-short.dto";
import { VacancyEntity } from "../models/entities/vacancy.entity";
import { PaginationParams } from "../../utils/types/query/pagination-params";
import { EditVacancyDto } from "../models/dto/vacancy/edit-vacancy.dto";

@Injectable()
export class VacancyService {
    private readonly logger: Logger

    constructor(private repository: VacancyRepository) {
        this.logger = new Logger(VacancyService.name)
    }

    async findOpenVacancies(pageOptions: PaginationParams, searchOptions?: GetVacanciesParams): Promise<[VacancyShortDto[], number]> {
        const data = await this.repository.findOpenVacancies(pageOptions, searchOptions)

        const shortDtos = data[0].map(elem => plainToInstance(VacancyShortDto, elem, {
            excludeExtraneousValues: true
        }))
        return [shortDtos, data[1]]
    }
    getVacancyById(id: string): Promise<VacancyEntity> {
        return this.repository.findVacancyById(id)
    }
    getPagesAmount(take: number, where?: GetVacanciesParams) {
        return this.repository.getPagesAmount(take, where)
    }
    createVacancy(vacancy: CreateVacancyDto): void {
        this.repository.createVacancy(vacancy)

        this.logger.log(`Vacancy "${vacancy.name}" was created`)
    }
    closeVacancy(id: string): void {
        this.repository.closeVacancy(id)
    }
    editVacancy(editBody: EditVacancyDto) {
        this.repository.editVacancy(editBody)
    }
    registerVacancyView(id: string): void {
        this.repository.registerVacancyView(id)
    }
    deleteVacancy(id: string): void {
        this.repository.deleteVacancy(id)
    }
}