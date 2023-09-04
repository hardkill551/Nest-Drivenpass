import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  providers: [UsersService, UsersRepository],
  exports:[UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
