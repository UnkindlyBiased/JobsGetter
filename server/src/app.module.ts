import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { UtilModule } from './modules/utils/util.module';
import { FeatureModule } from './modules/features/feature.module';
import { HttpExceptionFilter } from '../utils/error/http-exception.filter';
import { JwtGuard } from '../utils/guards/jwt.guard';

@Module({
  imports: [FeatureModule, UtilModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ]
})
export class AppModule {}
