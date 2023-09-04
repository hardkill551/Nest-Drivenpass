import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from 'src/guard/auth.guard';

@Module({
  imports:[JwtModule.register({
    secret:process.env.JWT_SECRET
  }), UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
