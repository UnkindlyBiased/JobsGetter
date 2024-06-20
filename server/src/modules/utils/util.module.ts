import { Module } from "@nestjs/common";

import { DatabaseModule } from "./inner/database.module";
import { AppConfigModule } from "./inner/config.module";
import { LoggerModule } from "./inner/logger.module";

@Module({
    imports: [DatabaseModule, AppConfigModule, LoggerModule]
})
export class UtilModule {}