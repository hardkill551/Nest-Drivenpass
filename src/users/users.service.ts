import { Injectable } from '@nestjs/common';
import { SignUpUserDto } from 'src/auth/dto/auth.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository:UsersRepository){}

    async getUserByUserName(username: string) {
        return await this.usersRepository.getUserByUserName(username)    }
    async getUserByEmail(email: string) {
        return await this.usersRepository.getUserByEmail(email)
    }
    create(signUpUser: SignUpUserDto) {
        return this.usersRepository.create(signUpUser)
    }
}