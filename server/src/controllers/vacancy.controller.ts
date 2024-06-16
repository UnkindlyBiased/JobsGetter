import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';

import { Vacancy } from '../models/domain/vacancy.model';
import { VacancyService } from '../services/vacancy.service';

@Controller('vacancy')
export class VacancyController {
	constructor(private controller: VacancyService) {}
	
	@Get()
	async getVacancies() {
		return await this.controller.getVacancies()
	}
	@Get(':id')
	async getVacancyById(@Param('id', ParseUUIDPipe) id: string) {
		return await this.controller.getVacancyById(id)
	}
	@Post()
	async createVacancy(@Body() body: Vacancy) {
		await this.controller.createVacancy(body)
	}
}
