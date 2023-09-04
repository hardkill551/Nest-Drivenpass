import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User as UserPrisma } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { CredentialsDto } from './dto/credential.dto';
import { CredentialsService } from './credentials.service';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {

    constructor(private readonly credentialsService:CredentialsService){}


    @Get()
    getAllCredentials(@User() user: UserPrisma){
        return this.credentialsService.getAllCredentials(user)
    }
    @Get(":id")
    getCredentialsById(@Param("id") id:string, @User() user: UserPrisma){
        return this.credentialsService.getCredentialsById(user, +id)

    }

    @Post()
    postCredentials(@Body() credentialDto: CredentialsDto, @User() user: UserPrisma){
        return this.credentialsService.create(credentialDto, user)
    }
}

