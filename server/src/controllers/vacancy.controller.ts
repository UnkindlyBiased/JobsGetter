import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post } from '@nestjs/common';

import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto } from '../models/dto/vacancy/create-vacancy.dto';
import { Serialize } from '../../utils/decorators/serialization.decorator';

@Controller('vacancies')
export class VacancyController {
	constructor(private service: VacancyService) {}
	
	@Get()
	getVacancies() {
		return this.service.getVacancies()
	}

	@Serialize(CreateVacancyDto)
	@Get(':id')
	async getVacancyById(@Param('id', ParseUUIDPipe) id: string) {
		const vacancy = await this.service.getVacancyById(id)
		if (!vacancy) {
			throw new NotFoundException('Vacancy was not found')
		}

		return vacancy
	}

	@Post()
	createVacancy(@Body() body: CreateVacancyDto) {
		this.service.createVacancy(body)
	}
}
