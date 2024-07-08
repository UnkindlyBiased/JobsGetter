import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "../models/entities/user.entity";
import { CreateUserDto } from "../models/dto/user/create-user.dto";
import { PartialKeys } from "../../utils/types/partial-keys";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(UserEntity) private userRep: Repository<UserEntity>) {}

    async getUsers(): Promise<UserEntity[]> {
        const entities = await this.userRep.find()

        return entities
    }
    async getUserByCondition(where: PartialKeys<UserEntity>): Promise<UserEntity | null> {
        const entity = await this.userRep.findOneBy(where)
        return entity
    }
    async create(input: CreateUserDto): Promise<UserEntity> {
        const entity = this.userRep.create(input)
        await this.userRep.insert(entity)

        return this.getUserByCondition({ emailAddress: input.emailAddress })
    }
    async checkNickname(nickname: string) {
        return this.userRep.existsBy({ shortName: nickname })
    }
}