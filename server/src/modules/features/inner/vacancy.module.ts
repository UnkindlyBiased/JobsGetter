import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { VacancyController } from "../../../controllers/vacancy.controller";
import { VacancyService } from "../../../services/vacancy.service";
import { VacancyRepository } from "../../../repositories/vacancy.repository";
import { VacancyEntity } from "../../../models/entities/vacancy.entity";
import { AuthModule } from "./auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([VacancyEntity]), AuthModule],
    controllers: [VacancyController],
    providers: [VacancyService, VacancyRepository]
})
export class VacancyModule {}