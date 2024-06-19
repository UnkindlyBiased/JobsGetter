import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { VacancyRepository } from "../repositories/vacancy.repository";
import { CreateVacancyDto } from "../models/dto/vacancy/create-vacancy.dto";
import { GetVacanciesParams } from "../models/dto/vacancy/get-vacancies.params.dto";
import { VacancyShortDto } from "../models/dto/vacancy/vacancy-short.dto";
import { VacancyEntity } from "../models/entities/vacancy.entity";

@Injectable()
export class VacancyService {
    constructor(private vacancyRep: VacancyRepository) {}

    async findOpenVacancies(options: GetVacanciesParams): Promise<VacancyShortDto[]> {
        const openVacancies = await this.vacancyRep.findOpenVacancies(options)

        return openVacancies.map(elem => plainToInstance(VacancyShortDto, elem, {
            excludeExtraneousValues: true
        }))
    }
    getVacancyById(id: string): Promise<VacancyEntity> {
        return this.vacancyRep.findVacancyById(id)
    }
    createVacancy(vacancy: CreateVacancyDto): void {
        this.vacancyRep.create(vacancy)
    }
    closeVacancy(id: string): void {
        this.vacancyRep.closeVacancy(id)
    }
    registerView(id: string): void {
        this.vacancyRep.registerView(id)
    }
}