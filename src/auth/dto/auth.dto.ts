import { IsEmail, IsString, IsStrongPassword } from "class-validator"


export class SignUpUserDto{
    @IsString()
    username:string
    @IsEmail()
    email:string
    @IsStrongPassword()
    password:string
}

export class SignInUserDto{
    @IsEmail()
    email:string
    @IsStrongPassword()
    password:string
}