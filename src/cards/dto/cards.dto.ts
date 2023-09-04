import { IsDate, IsNumber, IsString, Contains } from "class-validator"


export class CardsDto{
    @IsString()
    name:string
    
    @IsString()
    printedName:string
    @IsNumber()
    securityCode:number
    @IsDate()
    expirationDate:Date
    @IsNumber()
    cardNumber: number;
    @IsString()
    password:string
    @IsString()
    @Contains("FISIC" || "VIRTUAL")
    category:string
    @IsString()
    @Contains("CREDIT" || "DEBIT" || "BOTH")
    type:string
}