import { Injectable, NotFoundException } from "@nestjs/common";

import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../models/dto/user/create-user.dto";
import { UserEntity } from "../models/entities/user.entity";
import { PartialKeys } from "../../utils/types/partial-keys";

@Injectable()
export class UserService {
    constructor(private repository: UserRepository) {}

    getUsers() {
        return this.repository.getUsers()
    }
    getUserByCondition(where: PartialKeys<UserEntity>) {
        const user = this.repository.getUserByCondition(where)
        if (!user) {
            throw new NotFoundException('User was not found by this condition')
        }
        
        return user
    }

    create(input: CreateUserDto) {
        return this.repository.create(input)    
    }
    checkNickname(nickname: string) {
        return this.repository.checkNickname(nickname)
    }
}