import { Expose } from "class-transformer";
import { IsEmail, IsString, IsUUID } from "class-validator";

export class UserShortDto {
    @Expose()
    @IsUUID()
    id: string

    @Expose()
    @IsString()
    username: string

    @Expose()
    @IsEmail()
    emailAddress: string
}