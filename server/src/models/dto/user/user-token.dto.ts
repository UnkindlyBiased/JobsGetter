import { IsEmail, IsString, IsUUID } from "class-validator";

export class UserTokenDto {
    @IsUUID()
    id: string

    @IsString()
    username: string

    @IsEmail()
    emailAddress: string
}