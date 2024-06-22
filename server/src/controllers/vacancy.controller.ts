import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto } from '../models/dto/vacancy/create-vacancy.dto';
import { GetVacanciesParams } from '../models/dto/vacancy/get-vacancies.params.dto';
import { PaginationParams } from '../../utils/types/query/pagination-params';
import { EditVacancyDto } from '../models/dto/vacancy/edit-vacancy.dto';
import { JwtGuard } from '../../utils/guards/jwt.guard';
import { Request } from 'express';

@Controller('vacancies')
export class VacancyController {
	constructor(private service: VacancyService) {}
	
	@Get()
	@UseGuards(JwtGuard)
	async getVacancies(@Query() pageQuery: PaginationParams, @Query() searchQuery: GetVacanciesParams, @Req() req: Request) {
		console.log(req.user)
		const maxPage = await this.service.getPagesAmount(pageQuery.limit, searchQuery)
		const data = await this.service.findOpenVacancies(pageQuery, searchQuery)

		return { 
			vacancies: data[0],
			amount: data[1], 
			page: pageQuery.page,
			maxPage,
			limit: pageQuery.limit 
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

	@Put()
	editVacancy(@Body() body: EditVacancyDto) {
		this.service.editVacancy(body)

		return { message: 'Vacancy was successfully updated' }
	}

	@Patch('close')
	closeVacancy(@Body('id', ParseUUIDPipe) id: string) {
		this.service.closeVacancy(id)

		return { message: 'Vacancy was successfully closed' } 
	}

	@Patch('view')
	registerView(@Body('id', ParseUUIDPipe) id: string) {
		this.service.registerVacancyView(id)

		return { message: 'Vacancy\'s views were successfully updated' }
	}

	@Delete()
	deleteVacancy(@Body('id', ParseUUIDPipe) id: string) {
		this.service.deleteVacancy(id)

		return { message: 'Vacancy was successfully deleted' }
	}
}
