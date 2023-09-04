import { Injectable } from '@nestjs/common';
import { SignUpUserDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
    
    constructor(private readonly prisma:PrismaService){}
    getUserByUserName(username: string) {
        return this.prisma.user.findUnique({
            where:{username}
        })
    }
    getUserById(id: number) {
        return this.prisma.user.findUnique({
            where:{id}
        })
    }
    getUserByEmail(email: string) {
        return this.prisma.user.findUnique({where:{email}})
    }
    create(signUpUser: SignUpUserDto) {
        return this.prisma.user.create({
            data:signUpUser
        })
    }
}
