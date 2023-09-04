import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User as UserPrisma } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { NotesDto } from './dto/notes.dto';
import { NotesService } from './notes.service';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {

    constructor(private readonly notesService:NotesService){}


    @Get()
    getAllNotes(@User() user: UserPrisma){
        return this.notesService.getAllNotes(user)
    }
    @Get(":id")
    getNotesById(@Param("id") id:string, @User() user: UserPrisma){
        return this.notesService.getNotesById(user, +id)

    }

    @Post()
    postNotes(@Body() notesDto: NotesDto, @User() user: UserPrisma){
        return this.notesService.create(notesDto, user)
    }
    @Delete(":id")
    deleteNote(@Param("id") id:string, @User() user: UserPrisma){
        return this.notesService.deleteNotesById(user, +id)

    }
}

