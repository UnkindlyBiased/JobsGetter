import { Body, Controller, Get, Post } from "@nestjs/common";

import { UserService } from "../services/user.service";
import { CreateUserDto } from "../models/dto/user/create-user.dto";
import { Public } from "../../utils/decorators/public.decorator";

@Controller('users')
export class UserController {
    constructor(private service: UserService) {}

    @Public()
    @Get()
    getUsers() {
        return this.service.getUsers()
    }

    @Post('register')
    create(@Body() user: CreateUserDto) {
        this.service.create(user)

        return { message: 'User was successfully created' }
    }
}