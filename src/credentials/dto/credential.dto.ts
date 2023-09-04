import { IsString, IsUrl } from "class-validator"


export class CredentialsDto{
    @IsString()
    name:string
    @IsUrl()
    url:string
    @IsString()
    emailOrUsername:string
    @IsString()
    password:string
}