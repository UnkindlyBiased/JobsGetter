import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";

import { CreateUserDto } from "../models/dto/user/create-user.dto";
import { AuthService } from "../services/auth.service";
import { CookieInterceptor } from "../../utils/interceptors/cookie.interceptor";
import { UserPayloadDto } from "../models/dto/user/user-payload.dto";

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return { accessToken: await this.service.register(body) }
    }
    
    @UseInterceptors(CookieInterceptor)
    @Post('login')
    async login(@Body() body: UserPayloadDto) {
        return this.service.login(body)
    }
}