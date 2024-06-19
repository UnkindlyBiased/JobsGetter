import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';

import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto } from '../models/dto/vacancy/create-vacancy.dto';
import { GetVacanciesParams } from '../models/dto/vacancy/get-vacancies.params.dto';

@Controller('vacancies')
export class VacancyController {
	constructor(private service: VacancyService) {}
	
	@Get()
	async getVacancies(@Query() queryParams: GetVacanciesParams) {
		const vacancies = await this.service.findOpenVacancies(queryParams)

		return { 
			vacancies, 
			page: queryParams.page, 
			limit: queryParams.limit 
		}
	}

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

		return { message: 'Vacancy created successfully' }
	}

	@Patch('close')
	closeVacancy(@Body('id', ParseUUIDPipe) id: string) {
		this.service.closeVacancy(id)

		return { message: 'Vacancy was successfully closed' } 
	}

	@Patch('view')
	registerView(@Body('id', ParseUUIDPipe) id: string) {
		this.service.registerView(id)

		return { message: 'Vacancy\'s views were successfully updated' }
	}
}
