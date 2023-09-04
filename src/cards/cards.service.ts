import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { CardsDto } from './dto/cards.dto';
import { User } from '@prisma/client';
import Cryptr from 'cryptr';

@Injectable()
export class CardsService {
    private cryptr: Cryptr

    constructor(private readonly cardsRepository:CardsRepository){
        const Cryptr = require('cryptr');
        this.cryptr = new Cryptr(process.env.JWT_SECRET)
    }
    async create(cardsDto:CardsDto, user:User){
        const name = await this.cardsRepository.getName(cardsDto.name, user.id)
        if(name) throw new ConflictException("Card name already exists")
        return this.cardsRepository.create(cardsDto, user.id)
    }
    async getAllCards(user:User){
        const cards = await this.cardsRepository.getCards(user.id)
        
        return cards.map(o=>{
            return {...o, password:this.cryptr.decrypt(o.password)}
        })
    }
    async getCardsById(user:User, id:number){
        const cards = await this.cardsRepository.getCardsById(id)
        if(!cards) throw new NotFoundException("Not Found Card")
        if(cards.userId !== user.id) throw new ForbiddenException("Forbidden")
        return {...cards, password:this.cryptr.decrypt(cards.password)}
    }
    async deleteCardsById(user:User, id:number){
        const cards = await this.cardsRepository.getCardsById(id)
        if(!cards) throw new NotFoundException("Not Found Card")
        if(cards.userId !== user.id) throw new ForbiddenException("Forbidden")
        return this.cardsRepository.deleteCardsById(id)
    }
}
