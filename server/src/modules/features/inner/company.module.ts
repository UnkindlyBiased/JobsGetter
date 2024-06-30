import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CompanyEntity } from "../../../models/entities/company.entity";
import { CompanyController } from "../../../controllers/company.controller";
import { CompanyService } from "../../../services/company.service";
import { CompanyRepository } from "../../../repositories/company.repository";

@Module({
    imports: [TypeOrmModule.forFeature([CompanyEntity])],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyRepository]
})
export class CompanyModule {}