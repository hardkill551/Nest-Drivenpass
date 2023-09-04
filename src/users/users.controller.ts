import { Controller, Delete, UseGuards } from '@nestjs/common';
import { User as UserPrisma } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('erase')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    @Delete()
    deleteUser(@User() user: UserPrisma){
        return this.userService.deleteAccount(user)
    }
}
