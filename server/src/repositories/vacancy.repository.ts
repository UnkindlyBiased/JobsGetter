import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateVacancyDto } from "../models/dto/vacancy/create-vacancy.dto";
import { VacancyEntity } from "../models/entities/vacancy.entity";

@Injectable()
export class VacancyRepository {
    constructor(@InjectRepository(VacancyEntity) private vacancyRep: Repository<VacancyEntity>) {}

    async findVacancies() {
        const entities = await this.vacancyRep.find()
        return entities
    }
    async findVacancyById(id: string) {
        const entity = await this.vacancyRep.findOneBy({ id })
        if (!entity) {
            throw new NotFoundException('This vacation was not found by given ID')
        }
        
        return entity
    }
    async create(vacancy: CreateVacancyDto) {
        const entity = this.vacancyRep.create(vacancy)
        await this.vacancyRep.insert(entity)
    }
}