import { Controller,
Post,
Put,
Patch,
Delete,
Get,
Param,
Body, 
Query,
BadRequestException,
Res,
Req,
UnauthorizedException
} from "@nestjs/common";
import { Filter } from "mongodb";
import { filter } from "rxjs";
import { UserDto } from "./user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtService } from "@nestjs/jwt";
import {Response, Request, response} from 'express';
const passwordHash = require('password-hash');

@ApiTags('User')
@Controller('users')
export class UsersController{
    constructor(
        private readonly usersService:UserService,
        private jwtService: JwtService
    ){}

    @Post()
    async insertUser(
        @Body() addUser : UserDto
    ){
        return await this.usersService.insertUser(addUser)
    }

    @Get()
    async getAllUsers(
        @Query() userDto: UserDto,
        @Req() request: Request
    ){
        try {
            const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
        const users = await this.usersService.getAllUser(userDto)
        return users
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @Get(':id')
    async getUsersById(
        @Param('id') id : string,
        @Req() request: Request
    ){
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.usersService.getUserById(id)
        return user
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @Patch(':id')
    async updateUsersById(
        @Param('id') id : string,
        @Body() update: UserDto,
        @Req() request: Request
    ){
        try {
            const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.usersService.updateUserById(id,update)
        return user
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @Get('/verify/:id')
    async verifyUserById(
        @Param('id') id : string
    ){
        const user = await this.usersService.verifyUserById(id)
        return user
    }

    @Delete(':id')
    async delUsersById(
        @Param('id') id : string,
        @Req() request: Request
    ){
        try {
            const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
            const user = await this.usersService.delUserById(id)
            return user 
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @Post('/login')
    async login(
        @Body('mail') mail: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ){
        const user = await this.usersService.getEmailUser(mail);
        if (!user) {
            throw new BadRequestException('user is not defined');
        }
        if (!passwordHash.verify(password, user.data.password)) {
            throw new BadRequestException('password is not valid');
        }
        const jwt = await this.jwtService.signAsync({id: user.data.id});
        response.cookie('jwt', jwt, {httpOnly: true});
        return {
            message: 'success'
        };
    }

    @Post('/logout')
    async logout(
        @Res({passthrough: true}) response: Response
        ) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }
    
}