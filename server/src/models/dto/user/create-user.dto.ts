import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1
    })
    password: string

    @IsString()
    @IsOptional()
    shortName: string

    @IsEmail()
    emailAddress: string
}