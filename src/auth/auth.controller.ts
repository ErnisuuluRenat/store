import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user-dto';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/singin-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post("register")
    async registerUser(@Body() registerUserDto : RegisterUserDto) {
        return this.authService.register(registerUserDto)
    }

    @Post("login")
    async login(@Body() signInUserDto: SignInUserDto) {
        return this.authService.signIn(signInUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async profile(@Request() req) {
        return req.user
    }

}
