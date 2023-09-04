import { IsString } from "class-validator"


export class NotesDto{
    @IsString()
    name:string
    @IsString()
    text:string
}