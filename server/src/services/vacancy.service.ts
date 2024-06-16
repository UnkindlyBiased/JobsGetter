import { Injectable } from "@nestjs/common";

import { Vacancy } from "../models/domain/vacancy.model";

@Injectable()
export class VacancyService {
    private vacancies: Vacancy[] = []

    async getVacancies(): Promise<Vacancy[]> {
        return this.vacancies
    }
    async getVacancyById(id: string): Promise<Vacancy> {
        return this.vacancies.filter(v => v.id === id)[0]
    }
    async createVacancy(vacancy: Vacancy): Promise<void> {
        this.vacancies.push(vacancy)
    }
}