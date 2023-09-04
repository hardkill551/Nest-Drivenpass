import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto, SignUpUserDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    private EXPIRATION_TIME = "2 days";
    private ISSUER = "Hugo";
    private AUDIENCE = "users";
    constructor(private readonly usersService:UsersService, private readonly jwtService:JwtService){}

    async login(signInUser: SignInUserDto) {
        const user = await this.usersService.getUserByEmail(signInUser.email)
        if(!user) throw new UnauthorizedException("Email or password invalid")
        console.log(user.password)
        console.log(signInUser.password)
        const password = bcrypt.compareSync(signInUser.password, user.password)
        if(!password) throw new UnauthorizedException("Email or password invalid")
        return this.createToken(user)
    }
    private createToken(user: User) {
        const { id, username } = user;

        const token = this.jwtService.sign({ username }, {
          expiresIn: this.EXPIRATION_TIME,
          subject: String(id),
          issuer: this.ISSUER,
          audience: this.AUDIENCE
        });
    
        return { token }
    }
    async create(signUpUserDto:SignUpUserDto) {
        const email = await this.usersService.getUserByEmail(signUpUserDto.email)
        const username = await this.usersService.getUserByUserName(signUpUserDto.username)
        if(email) throw new ConflictException("Email already exists")
        if(username) throw new ConflictException("Username already exists")
        const password = bcrypt.hashSync(signUpUserDto.password, 10)
        return this.usersService.create({...signUpUserDto, password})
    }
}
