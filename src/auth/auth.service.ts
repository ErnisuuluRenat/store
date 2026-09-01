import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user-dto';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/singin-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService) {}

    async register(dto : RegisterUserDto) {
        const {username, password, email} = dto

        const userExists = await this.userRepository.findOne({where: [
            {username},
            {email}
        ]})

        if (userExists) {
            throw new ConflictException("User already exists")
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const user = this.userRepository.create({
            username,
            email,
            hashedPassword
        })

        await this.userRepository.save(user)

        return {"message" : "OK"}
    }

    async signIn(signInUserDto : SignInUserDto) {
        const {login, password} = signInUserDto

        const user = await this.userRepository.findOne({where: [
            {username : login},
            {email : login}
        ]})

        if(!user) {
            await bcrypt.compare(password, "$2b$10$/34mZHxeI0aCiuTiW7jFM.xIuaJmtWuXo/b6GvQZMjZljJOtplTIS")
            throw new UnauthorizedException("Invalid Credentials")
        }

        const passwordMatch = await bcrypt.compare(password, user.hashedPassword)

        if (!passwordMatch) {
            throw new UnauthorizedException("Invalid Credentials")
        }

        const payload = {sub: user.user_id, role: user.role}

        const accessToken = await this.jwtService.signAsync(payload)

        return {accessToken}
    }
}
