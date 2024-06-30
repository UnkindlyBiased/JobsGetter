import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CompanyEntity } from "../models/entities/company.entity";

@Injectable()
export class CompanyRepository {
    constructor(@InjectRepository(CompanyEntity) companyRep: Repository<CompanyEntity>) {}
}