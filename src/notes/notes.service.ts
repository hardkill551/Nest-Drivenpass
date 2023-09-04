import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { NotesDto } from './dto/notes.dto';
import { User } from '@prisma/client';
import Cryptr from 'cryptr';

@Injectable()
export class NotesService {
    private cryptr: Cryptr

    constructor(private readonly notesRepository:NotesRepository){
        const Cryptr = require('cryptr');
        this.cryptr = new Cryptr(process.env.JWT_SECRET)
    }
    async create(body:NotesDto, user:User){
        const name = await this.notesRepository.getName(body.name, user.id)
        if(name) throw new ConflictException("Notes name already exists")
        return this.notesRepository.create(body, user.id)
    }
    async getAllNotes(user:User){
        const notes = await this.notesRepository.getNotes(user.id)
        
        return notes
    }
    async getNotesById(user:User, id:number){
        const notes = await this.notesRepository.getNotesById(id)
        if(!notes) throw new NotFoundException("Not Found Note")
        if(notes.userId !== user.id) throw new ForbiddenException("Forbidden")
        return notes
    }
    async deleteNotesById(user:User, id:number){
        const notes = await this.notesRepository.getNotesById(id)
        if(!notes) throw new NotFoundException("Not Found Notes")
        if(notes.userId !== user.id) throw new ForbiddenException("Forbidden")
        return this.notesRepository.deleteNotesById(id)
    }
}
