import { Injectable } from "@nestjs/common";

import { VacancyRepository } from "../repositories/vacancy.repository";
import { CreateVacancyDto } from "../models/dto/vacancy/create-vacancy.dto";

@Injectable()
export class VacancyService {
    constructor(private vacancyRep: VacancyRepository) {}

    getVacancies() {
        return this.vacancyRep.findVacancies()
    }
    getVacancyById(id: string) {
        return this.vacancyRep.findVacancyById(id)
    }
    createVacancy(vacancy: CreateVacancyDto) {
        this.vacancyRep.create(vacancy)
    }
}