import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { ConfigService } from "@nestjs/config";

import { UserService } from "./user.service";
import { CreateUserDto } from "../models/dto/user/create-user.dto";
import { UserPayloadDto } from "../models/dto/user/user-payload.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async register(input: CreateUserDto) {
        const userByEmail = await this.userService.getUserByCondition({ emailAddress: input.emailAddress })
        if (userByEmail) {
            throw new ConflictException('This user was already registered by this email')
        }

        const hashedPassword = await hash(input.password, 3)
        const changedInput: CreateUserDto = {
            ...input,
            password: hashedPassword
        }

        await this.userService.create(changedInput)

        const payload = plainToInstance(UserPayloadDto, input)
        return this.login(payload)
    }
    async login(payload: UserPayloadDto) {
        const user = await this.verify(payload)
        const plain = instanceToPlain(user)

        return { 
            accessToken: await this.jwtService.signAsync(plain)
        }
    }
    async verify(payload: UserPayloadDto) {
        const user = await this.userService.getUserByCondition({ emailAddress: payload.emailAddress })
        if (!user) {
            throw new BadRequestException('User was not given somehow')
        }
        
        const arePasswordsEqual = await compare(payload.password, user.password)

        if (!arePasswordsEqual && payload.password !== user.password) throw new UnauthorizedException('Passwords does not match')

        return user
    }
}