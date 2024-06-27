import { Expose } from "class-transformer";
import { IsEmail, IsStrongPassword } from "class-validator";

export class UserPayloadDto {
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1
    })
    @Expose()
    password: string

    @IsEmail()
    @Expose()
    emailAddress: string
}