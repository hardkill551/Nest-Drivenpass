import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotesDto } from './dto/notes.dto';

@Injectable()
export class NotesRepository {
    constructor(private readonly prisma:PrismaService){}
    
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
