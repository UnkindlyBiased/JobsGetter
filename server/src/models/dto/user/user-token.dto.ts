import { Expose } from "class-transformer";
import { IsEmail, IsString, IsUUID } from "class-validator";

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
}