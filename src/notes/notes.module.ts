import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesRepository } from './notes.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[AuthModule, UsersModule],
  providers: [NotesService, NotesRepository],
  controllers: [NotesController]
})
export class NotesModule {}
