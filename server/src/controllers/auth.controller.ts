import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";

import { CreateUserDto } from "../models/dto/user/create-user.dto";
import { AuthService } from "../services/auth.service";
import { CookieInterceptor } from "../../utils/interceptors/cookie.interceptor";
import { UserPayloadDto } from "../models/dto/user/user-payload.dto";
import { Public } from "../../utils/decorators/public.decorator";
import { Roles } from "../../utils/decorators/roles.decorator";

@Public()
@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('register')
    @Roles('hello', 'yes')
    register(@Body() body: CreateUserDto) {
        return this.service.register(body)
    }
    
    @UseInterceptors(CookieInterceptor)
    @Post('login')
    login(@Body() body: UserPayloadDto) {
        return this.service.login(body)
    }
}