import { Injectable, NotFoundException } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateVacancyDto } from "../models/dto/vacancy/create-vacancy.dto";
import { VacancyEntity } from "../models/entities/vacancy.entity";
import { PaginationParams } from "../../utils/types/query/pagination-params";
import { GetVacanciesParams } from "../models/dto/vacancy/get-vacancies.params.dto";

@Injectable()
export class VacancyRepository {
    constructor(@InjectRepository(VacancyEntity) private vacancyRep: Repository<VacancyEntity>) {}

    async findOpenVacancies(options: GetVacanciesParams): Promise<VacancyEntity[]> {
        const entities = await this.vacancyRep.find({
            where: {
                name: ILike(`%${options.search}%`),
                isClosed: false
            },
            take: options.limit,
            skip: options.limit * (options.page - 1)
        })
        return entities
    }
    async findAllVacancies(options: PaginationParams): Promise<VacancyEntity[]> {
        const entities = await this.vacancyRep.find({
            take: options.limit,
            skip: options.limit * (options.page - 1)
        })
        return entities
    }
    async findVacancyById(id: string): Promise<VacancyEntity> {
        const entity = await this.vacancyRep.findOneBy({ id })
        if (!entity) {
            throw new NotFoundException('This vacation was not found by given ID')
        }
        
        return entity
    }
    async create(vacancy: CreateVacancyDto): Promise<void> {
        const entity = this.vacancyRep.create(vacancy)

        await this.vacancyRep.insert(entity)
    }
    async closeVacancy(id: string): Promise<void> {
        await this.vacancyRep.update(id, { isClosed: true })
    }
    async registerView(id: string): Promise<void> {
        await this.vacancyRep.increment({ id }, 'views', 1)
    }
}