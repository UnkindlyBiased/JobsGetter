import { Injectable } from "@nestjs/common";

import { CompanyRepository } from "../repositories/company.repository";

@Injectable()
export class CompanyService {
    constructor(private repository: CompanyRepository) {}

    findCompanies() {
        return this.repository.findCompanies()
    }
    findCompanyById(companyId: string) {
        return this.repository.findCompanyById(companyId)
    }
}