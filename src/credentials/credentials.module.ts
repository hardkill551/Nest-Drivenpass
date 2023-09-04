import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[AuthModule, UsersModule],
  providers: [CredentialsService, CredentialsRepository],
  controllers: [CredentialsController]
})
export class CredentialsModule {}
