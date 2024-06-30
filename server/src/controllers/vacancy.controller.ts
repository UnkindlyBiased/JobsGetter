import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Put, Query, UnprocessableEntityException } from '@nestjs/common';

import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto } from '../models/dto/vacancy/create-vacancy.dto';
import { GetVacanciesParams } from '../models/dto/vacancy/get-vacancies.params.dto';
import { PaginationParams } from '../../utils/types/query/pagination-params';
import { EditVacancyDto } from '../models/dto/vacancy/edit-vacancy.dto';
import { Public } from '../../utils/decorators/public.decorator';
import { CurrentUser } from '../../utils/decorators/current-user.decorator';
import { UserEntity } from '../models/entities/user.entity';
import { ResponseMessage } from '../../utils/decorators/response-message.decorator';
import { Roles } from '../../utils/decorators/roles.decorator';

@Controller('vacancies')
export class VacancyController {
	constructor(private service: VacancyService) {}
	
	@Get()
	@Public()
	async getVacancies(
		@Query() pageQuery: PaginationParams, 
		@Query() searchQuery: GetVacanciesParams
	) {
		const maxPage = await this.service.getPagesAmount(pageQuery.limit, searchQuery)
		const data = await this.service.findVacancies(pageQuery, searchQuery)

		return { 
			vacancies: data[0],
			amount: data[1], 
			page: pageQuery.page,
			maxPage,
			limit: pageQuery.limit 
		}
	}

	@Public()
	@Get(':id')
	async getVacancyById(@Param('id', ParseUUIDPipe) id: string) {
		const vacancy = await this.service.getVacancyById(id)

		return vacancy
	}

	@ResponseMessage('Vacancy created successfully')
	@Post()
	createVacancy(@Body() body: CreateVacancyDto, @CurrentUser() recruter: UserEntity) {
		this.service.createVacancy(body, recruter.id)
	}

	@ResponseMessage('Vacancy was successfully updated')
	@Put()
	editVacancy(@Body() body: EditVacancyDto, @CurrentUser() recruter: UserEntity) {
		if (recruter.id !== body.recruterId) {
			throw new ForbiddenException('This vacancy does not belong to you')
		}

		this.service.editVacancy(body)
	}

	@ResponseMessage('Vacancy was successfully closed')
	@Patch('close')
	async closeVacancy(
		@Body('id', ParseUUIDPipe) id: string,
		@Body('recruterId', ParseUUIDPipe) recruterId: string,
		@CurrentUser() recruter: UserEntity
	) {
		if (recruter.id !== recruterId) {
			throw new ForbiddenException('This vacancy does not belong to you')
		}

		const isAlreadyClosed = await this.service.closeVacancy(id)
		
		if (isAlreadyClosed) {
			throw new UnprocessableEntityException('Vacancy is already closed, so it cannot be reopened')
		}
	}

	@ResponseMessage("Vacancy's views were successfully updated")
	@Patch('view')
	registerView(@Body('id', ParseUUIDPipe) id: string) {
		this.service.registerVacancyView(id)
	}

	@ResponseMessage('Vacancy was successfully deleted')
	@Delete()
	deleteVacancy(
		@Body('id', ParseUUIDPipe) id: string,
		@Body('recruterId', ParseUUIDPipe) recruterId: string,
		@CurrentUser() recruter: UserEntity
	) {
		if (recruter.id !== recruterId) {
			throw new ForbiddenException('This vacancy does not belong to you')
		}
		
		this.service.deleteVacancy(id)
	}
}
