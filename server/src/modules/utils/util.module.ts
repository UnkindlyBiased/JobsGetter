import { Module } from "@nestjs/common";

import { DatabaseModule } from "./inner/database.module";
import { AppConfigModule } from "./inner/config.module";

@Module({
    imports: [DatabaseModule, AppConfigModule]
})
export class UtilModule {}