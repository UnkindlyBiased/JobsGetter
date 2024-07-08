import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";

import { CompanyService } from "../services/company.service";
import { Public } from "../../utils/decorators/public.decorator";
import { Roles } from "../../utils/decorators/roles.decorator";
import { UserRoles } from "../../utils/types/enums/user-roles.enum";

@Roles(UserRoles.ADMIN)
@Controller('companies')
export class CompanyController {
    constructor(private service: CompanyService) {}

    @Public()
    @Get()
    findCompanies() {
        return this.service.findCompanies()
    }

    @Public()
    @Get(':id')
    async findCompanyById(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.findCompanyById(id)
    }
}