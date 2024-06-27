import { Module } from "@nestjs/common";

import { VacancyModule } from "./inner/vacancy.module";
import { UserModule } from "./inner/user.module";
import { AuthModule } from "./inner/auth.module";
import { CompanyModule } from "./inner/company.module";

@Module({
    imports: [
        VacancyModule,
        UserModule,
        AuthModule,
        CompanyModule
    ]
})
export class FeatureModule {}