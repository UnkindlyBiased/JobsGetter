import { Expose } from "class-transformer";

import { UserRoles } from "../../../../utils/types/enums/user-roles.enum";

export class UserShortDto {
    @Expose()
    id: string

    @Expose()
    username: string

    @Expose()
    shortName: string

    @Expose()
    profilePicLink: string

    @Expose()
    role: UserRoles
}