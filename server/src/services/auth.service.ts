import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { plainToInstance } from "class-transformer";

import { UserService } from "./user.service";
import { CreateUserDto } from "../models/dto/user/create-user.dto";
import { UserPayloadDto } from "../models/dto/user/user-payload.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async register(input: CreateUserDto) {
        console.log('Input', input)
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

        const payload = plainToInstance(UserPayloadDto, input, {
            excludeExtraneousValues: true
        })
        return this.login(payload)
    }
    async login(payload: UserPayloadDto) {
        const user = await this.verify(payload)
        return this.jwtService.sign(JSON.parse(JSON.stringify(user)))
    }
    async verify(payload: UserPayloadDto) {
        const user = await this.userService.getUserByCondition({ emailAddress: payload.emailAddress })
        if (!user) {
            throw new BadRequestException('User was not given somehow')
        }
        console.log(payload.password, user.password)
        const arePasswordsEqual = await compare(payload.password, user.password)

        if (!arePasswordsEqual && payload.password !== user.password) throw new UnauthorizedException('Passwords does not match')

        return user
    }
}