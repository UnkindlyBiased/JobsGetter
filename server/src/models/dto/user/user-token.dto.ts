import { Expose } from "class-transformer";
import { IsEmail, IsEnum, IsString, IsUUID } from "class-validator";

import { UserRoles } from "../../../../utils/types/enums/user-roles.enum";

export class UserTokenDto {
    @IsUUID()
    @Expose()
    id: string

    @IsString()
    @Expose()
    username: string

    @IsEmail()
    @Expose()
    emailAddress: string

    @IsEnum(UserRoles)
    role: UserRoles
}