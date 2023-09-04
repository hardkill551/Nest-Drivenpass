import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardsDto } from './dto/cards.dto';
import Cryptr from 'cryptr';

@Injectable()
export class CardsRepository {
   
    private cryptr: Cryptr

    constructor(private readonly prisma:PrismaService){
        const Cryptr = require('cryptr');
        this.cryptr = new Cryptr(process.env.JWT_SECRET)
    }
    
    create(body:CardsDto, userId:number){
        return this.prisma.cards.create({
            data:{
                ...body, password:this.cryptr.encrypt(body.password), userId
            }
        })
    }
    
    getCards(userId: number) {
        return this.prisma.cards.findMany({
            where:{
                userId
            }
        })
    }
    getCardsById(id:number) {
        return this.prisma.cards.findUnique({
            where:{
                id
            }
        })
    }
    getName(name:string, userId:number){
        return this.prisma.cards.findFirst({
            where:{
                name,
                userId
            }
        })
    }

    deleteCardsById(id: number) {
        return this.prisma.cards.delete({
            where:{
                id
            }
        })    
    }
}
