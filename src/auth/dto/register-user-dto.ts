import { IsEmail, MinLength, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {"message" : "Password must be at least 8 characters long"})
    password: string
}