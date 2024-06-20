import { Injectable, NotFoundException } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateVacancyDto } from "../models/dto/vacancy/create-vacancy.dto";
import { VacancyEntity } from "../models/entities/vacancy.entity";
import { PaginationParams } from "../../utils/types/query/pagination-params";
import { GetVacanciesParams } from "../models/dto/vacancy/get-vacancies.params.dto";
import { EditVacancyDto } from "../models/dto/vacancy/edit-vacancy.dto";

@Injectable()
export class VacancyRepository {
    constructor(@InjectRepository(VacancyEntity) private vacancyRep: Repository<VacancyEntity>) {}

    async findOpenVacancies(pageOptions: PaginationParams, searchOptions?: GetVacanciesParams): Promise<[VacancyEntity[], number]> {
        const [entities, amount] = await this.vacancyRep.findAndCount({
            where: {
                isClosed: searchOptions.all === 'true' ? undefined : false,
                name: ILike(`%${searchOptions.search}%`),
            },
            take: pageOptions.limit,
            skip: pageOptions.limit * (pageOptions.page - 1),
            cache: 30000
        })
        return [entities, amount]
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
    async getPagesAmount(take: number, searchOptions?: GetVacanciesParams): Promise<number> {
        const allEntities = await this.vacancyRep.count({
            where: {
                name: ILike(`%${searchOptions.search}%`),
                isClosed: searchOptions.all === 'true' ? undefined : false,
            },
            cache: 30000
        })

        return Math.ceil(allEntities / take)
    }
    async createVacancy(vacancy: CreateVacancyDto): Promise<void> {
        const entity = this.vacancyRep.create(vacancy)

        await this.vacancyRep.insert(entity)
    }
    async editVacancy(editInput: EditVacancyDto): Promise<void> {
        const isExisting = await this.vacancyRep.existsBy({ id: editInput.id })
        if (!isExisting) {
            throw new NotFoundException('This vacancy doesn\'t exist')
        }

        await this.vacancyRep.update(editInput.id, editInput)
    }
    async closeVacancy(id: string): Promise<void> {
        await this.vacancyRep.update(id, { isClosed: true })
    }
    async registerVacancyView(id: string): Promise<void> {
        await this.vacancyRep.increment({ id }, 'views', 1)
    }
    async deleteVacancy(id: string): Promise<void> {
        await this.vacancyRep.remove({ id } as VacancyEntity)
    }
}