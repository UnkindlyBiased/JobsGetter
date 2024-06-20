import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { VacancyController } from "../../../controllers/vacancy.controller";
import { VacancyService } from "../../../services/vacancy.service";
import { VacancyRepository } from "../../../repositories/vacancy.repository";
import { VacancyEntity } from "../../../models/entities/vacancy.entity";

@Module({
    imports: [TypeOrmModule.forFeature([VacancyEntity])],
    controllers: [VacancyController],
    providers: [VacancyService, VacancyRepository]
})
export class VacancyModule {}