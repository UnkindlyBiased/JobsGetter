import { Module } from "@nestjs/common";

import { VacancyModule } from "./inner/vacancy.module";
import { UserModule } from "./inner/user.module";
import { AuthModule } from "./inner/auth.module";

@Module({
    imports: [
        VacancyModule,
        UserModule,
        AuthModule
    ]
})
export class FeatureModule {}