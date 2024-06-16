import { Module } from "@nestjs/common";

import { VacancyController } from "../controllers/vacancy.controller";
import { VacancyService } from "../services/vacancy.service";

@Module({
    controllers: [VacancyController],
    providers: [VacancyService]
})
export class VacancyModule {}