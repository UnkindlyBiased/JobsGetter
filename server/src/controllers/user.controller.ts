import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { UserService } from "../services/user.service";
import { CreateUserDto } from "../models/dto/user/create-user.dto";
import { Public } from "../../utils/decorators/public.decorator";
import { Serialize } from "../../utils/decorators/serialization.decorator";
import { UserShortDto } from "../models/dto/user/user-short.dto";
import { UserShowcaseDto } from "../models/dto/user/user-showcase.dto";


@Controller('users')
export class UserController {
    constructor(private service: UserService) {}

    @Public()
    @Get()
    @Serialize(UserShortDto)
    getUsers() {
        return this.service.getUsers()
    }

    @Get('by-nickname/:nickname')
    @Serialize(UserShowcaseDto)
    getUserByNickname(@Param('nickname') nickname: string) {
        return this.service.getUserByCondition({ shortName: nickname })
    }

    @Post('register')
    create(@Body() user: CreateUserDto) {
        this.service.create(user)

        return { message: 'User was successfully created' }
    }

    @Public()
    @Post('check-nickname')
    async checkNickname(@Body('nickname') nickname: string) {
        return { isAvailable: !(await this.service.checkNickname(nickname)) }
    }
}