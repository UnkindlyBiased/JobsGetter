import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { UtilModule } from './modules/utils/util.module';
import { FeatureModule } from './modules/features/feature.module';
import { HttpExceptionFilter } from '../utils/error/http-exception.filter';

@Module({
  imports: [FeatureModule, UtilModule],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }]
})
export class AppModule {}
