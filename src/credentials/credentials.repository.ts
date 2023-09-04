import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredentialsDto } from './dto/credential.dto';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsRepository {
   
    private cryptr: Cryptr

    constructor(private readonly prisma:PrismaService){
        const Cryptr = require('cryptr');
        this.cryptr = new Cryptr(process.env.JWT_SECRET)
    }
    
    create(body:CredentialsDto, userId:number){

        return this.prisma.credentials.create({
            data:{
                ...body, password:this.cryptr.encrypt(body.password), userId
            }
        })
    }
    
    getCredentials(userId: number) {
        return this.prisma.credentials.findMany({
            where:{
                userId
            }
        })
    }
    getCredentialsById(id:number) {
        return this.prisma.credentials.findUnique({
            where:{
                id
            }
        })
    }
    getName(name:string, userId:number){
        return this.prisma.credentials.findFirst({
            where:{
                name,
                userId
            }
        })
    }

    deleteCredentialsById(id: number) {
        return this.prisma.credentials.delete({
            where:{
                id
            }
        })    
    }
}
