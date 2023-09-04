import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User as UserPrisma } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { CardsDto } from './dto/cards.dto';
import { CardsService } from './cards.service';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {

    constructor(private readonly cardsService:CardsService){}


    @Get()
    getAllCards(@User() user: UserPrisma){
        return this.cardsService.getAllCards(user)
    }
    @Get(":id")
    getCardsById(@Param("id") id:string, @User() user: UserPrisma){
        return this.cardsService.getCardsById(user, +id)

    }

    @Post()
    postCards(@Body() cardsDto: CardsDto, @User() user: UserPrisma){
        return this.cardsService.create(cardsDto, user)
    }
    @Delete(":id")
    deleteCards(@Param("id") id:string, @User() user: UserPrisma){
        return this.cardsService.deleteCardsById(user, +id)

    }
}

