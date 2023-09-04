import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsRepository } from './cards.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CardsController } from './cards.controller';

@Module({
  imports:[AuthModule, UsersModule],
  providers: [CardsService, CardsRepository],
  controllers: [CardsController]
})
export class CardsModule {}
