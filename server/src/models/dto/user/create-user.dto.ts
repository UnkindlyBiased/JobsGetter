import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1
    })
    password: string

    @IsEmail()
    emailAddress: string
}