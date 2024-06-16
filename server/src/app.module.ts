import { Module } from '@nestjs/common';
import { VacancyModule } from './modules/vacancy.module';

@Module({
  imports: [VacancyModule]
})
export class AppModule {}
