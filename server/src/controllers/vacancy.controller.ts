import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('vacancy')
export class VacancyController {
	@Get()
	getVacancies() {
		return {
			message: 'working'
		}
	}
	@Get(':id')
	getVacancyById(@Param('id') id: number) {
		return {
			id,
			vacancy: `Vacancy ${id}`
		}
	}
	@Post()
	createVacancy() {
		return new Promise((resolve) => {
			setTimeout(() => resolve({ message: 'Vacancy created' }), 2500)
		})
	}
}
