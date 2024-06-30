import { Controller } from "@nestjs/common";

import { CompanyService } from "../services/company.service";

@Controller('companies')
export class CompanyController {
    constructor(private service: CompanyService) {}
}