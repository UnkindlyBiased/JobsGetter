import { Expose } from "class-transformer"

import { UserRoles } from "../../../../utils/types/enums/user-roles.enum"

export class UserShowcaseDto {
    @Expose()
    id: string

    @Expose()
    username: string

    @Expose()
    shortName: string

    @Expose()
    emailAddress: string

    @Expose()
    profilePicLink: string

    @Expose()
    role: UserRoles
}