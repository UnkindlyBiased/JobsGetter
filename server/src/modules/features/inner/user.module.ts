import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "../../../models/entities/user.entity";
import { UserController } from "../../../controllers/user.controller";
import { UserService } from "../../../services/user.service";
import { UserRepository } from "../../../repositories/user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService]
})
export class UserModule {}