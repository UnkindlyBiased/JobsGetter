import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CompanyEntity } from "../models/entities/company.entity";

@Injectable()
export class CompanyRepository {
    constructor(@InjectRepository(CompanyEntity) private companyRep: Repository<CompanyEntity>) {}

    async findCompanies() {
        const entities = await this.companyRep.find()

        return entities
    }
    async findCompanyById(id: string) {
        const entity = await this.companyRep.findOneBy({ id })
        if (!entity) {
            throw new NotFoundException('Company by this ID was not found')
        }
        
        return entity
    }
}