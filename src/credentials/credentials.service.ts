import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CredentialsDto } from './dto/credential.dto';
import { User } from '@prisma/client';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsService {
    private cryptr: Cryptr

    constructor(private readonly credentialsRepository:CredentialsRepository){
        const Cryptr = require('cryptr');
        this.cryptr = new Cryptr(process.env.JWT_SECRET)
    }
    async create(body:CredentialsDto, user:User){
        const name = await this.credentialsRepository.getName(body.name, user.id)
        if(name) throw new ConflictException("Credential name already exists")
        return this.credentialsRepository.create(body, user.id)
    }
    async getAllCredentials(user:User){
        const credentials = await this.credentialsRepository.getCredentials(user.id)
        
        return credentials.map(o=>{
            return {...o, password:this.cryptr.decrypt(o.password)}
        })
    }
    async getCredentialsById(user:User, id:number){
        const credentials = await this.credentialsRepository.getCredentialsById(id)
        if(!credentials) throw new NotFoundException("Not Found Credential")
        if(credentials.userId !== user.id) throw new ForbiddenException("Forbidden")
        return {...credentials, password:this.cryptr.decrypt(credentials.password)}
    }
}
