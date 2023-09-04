import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInUserDto, SignUpUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService:AuthService){}

    @Post("sign-up")
    signUp(@Body() signUpUserDto: SignUpUserDto){
        return this.AuthService.create(signUpUserDto)
    }

    @Post("sign-in")
    @HttpCode(HttpStatus.CREATED)
    signIn(@Body() signInUserDto: SignInUserDto){
        return this.AuthService.login(signInUserDto)
    }
}
