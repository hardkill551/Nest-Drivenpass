import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { User as UserPrisma } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { PasswordDto } from './dto/password.dto';

@UseGuards(AuthGuard)
@Controller('erase')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Delete()
    deleteUser(@Body() userDto:PasswordDto, @User() user: UserPrisma){
        return this.userService.deleteAccount(user, userDto.password)
    }
}
