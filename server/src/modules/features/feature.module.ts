import { Module } from "@nestjs/common";

import { VacancyModule } from "./inner/vacancy.module";
import { UserModule } from "./inner/user.module";
import { AuthModule } from "./inner/auth.module";
import { CompanyModule } from "./inner/company.module";
import { CategoryModule } from "./inner/category.module";

@Module({
    imports: [
        VacancyModule,
        UserModule,
        AuthModule,
        CompanyModule,
        CategoryModule
    ]
})
export class FeatureModule {}