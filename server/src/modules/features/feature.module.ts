import { Module } from "@nestjs/common";

import { VacancyModule } from "./inner/vacancy.module";

@Module({
    imports: [VacancyModule]
})
export class FeatureModule {}