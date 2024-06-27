import { Injectable, Logger, UnprocessableEntityException } from "@nestjs/common";
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

    async findVacancies(pageOptions: PaginationParams, searchOptions?: GetVacanciesParams): Promise<[VacancyShortDto[], number]> {
        const data = await this.repository.findVacancies(pageOptions, searchOptions)

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
    createVacancy(vacancy: CreateVacancyDto, recruterId: string): void {
        this.repository.createVacancy(vacancy, recruterId)

        this.logger.log(`Vacancy "${vacancy.name}" was created`)
    }
    async closeVacancy(id: string): Promise<boolean> {
        const isAlreadyClosed = await this.repository.closeVacancy(id)

        if (isAlreadyClosed) return true

        this.logger.log(`Vacancy with ID ${id} was closed`)
    }
    editVacancy(editBody: EditVacancyDto) {
        this.repository.editVacancy(editBody)

        this.logger.log(`Vacancy with ID ${editBody.id} was edited`)
    }
    registerVacancyView(id: string): void {
        this.repository.registerVacancyView(id)
    }
    deleteVacancy(id: string): void {
        this.repository.deleteVacancy(id)

        this.logger.log(`Vacancy with ID ${id} was removed`)
    }
}