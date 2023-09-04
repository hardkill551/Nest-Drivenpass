import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotesDto } from './dto/notes.dto';
import Cryptr from 'cryptr';

@Injectable()
export class NotesRepository {
   
    private cryptr: Cryptr

    constructor(private readonly prisma:PrismaService){
        const Cryptr = require('cryptr');
        this.cryptr = new Cryptr(process.env.JWT_SECRET)
    }
    
    create(body:NotesDto, userId:number){

        return this.prisma.notes.create({
            data:{
                ...body, userId
            }
        })
    }
    
    getNotes(userId: number) {
        return this.prisma.notes.findMany({
            where:{
                userId
            }
        })
    }
    getNotesById(id:number) {
        return this.prisma.notes.findUnique({
            where:{
                id
            }
        })
    }
    getName(name:string, userId:number){
        return this.prisma.notes.findFirst({
            where:{
                name,
                userId
            }
        })
    }

    deleteNotesById(id: number) {
        return this.prisma.notes.delete({
            where:{
                id
            }
        })    
    }
}
