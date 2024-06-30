import { Injectable } from "@nestjs/common";

import { CompanyRepository } from "../repositories/company.repository";

@Injectable()
export class CompanyService {
    constructor(private repository: CompanyRepository) {}
}