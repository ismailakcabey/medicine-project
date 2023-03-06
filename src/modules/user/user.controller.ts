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
UnauthorizedException,
UseGuards,
Inject,
CACHE_MANAGER
} from "@nestjs/common";
import { Filter } from "mongodb";
import { filter } from "rxjs";
import { UserDto } from "./user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtService } from "@nestjs/jwt";
import {Response, Request, response} from 'express';
import { UserTokenService } from "../user-token/userToken.service";
import { RoleGuard } from "./role.guard";
import { Roles } from "./role.decorator";
import { Role } from "./user.enum";
import { send_verify_email } from "./sendEmail";
import { request } from "http";
import { Cache } from "cache-manager";
const passwordHash = require('password-hash');

@ApiTags('User')
@Controller('users')
@UseGuards(RoleGuard)
export class UsersController{
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly usersService:UserService,
        private jwtService: JwtService,
        private readonly userTokenService:UserTokenService
    ){}

    @ApiOperation({ summary: 'User Create', description: 'API to use to create user' })
    @Post()
    async insertUser(
        @Body() addUser : UserDto,
        @Req() request: Request
    ){
        const cookie = request.headers.authorization
        const data = await this.jwtService.verifyAsync(cookie);
        addUser.createdById = data.id
        //await this.cacheManager.del('users')
        return await this.usersService.insertUser(addUser)
    }

    @ApiOperation({ summary: 'User View', description: 'API to use to list user' })
    @Get()
    async getAllUsers(
        @Query() userDto: UserDto,
        @Req() request: Request
    ){
        try {
            
            const cookie = request.headers.authorization
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
            const users = await this.usersService.getAllUser(userDto)
            //await this.cacheManager.set('users', users);
            return users
        
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @ApiOperation({ summary: 'User View', description: 'API to use to view a user' })
    @Get(':id')
    async getUsersById(
        @Param('id') id : string,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.usersService.getUserById(id)
        return user
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @ApiOperation({ summary: 'User View', description: 'API that lists users belonging to the pharmacy' })
    @Get('/pharmcy/:id')
    async getUserByPharmcyId(
        @Param('id') id : string,
        @Req() request: Request,
        @Query() userDto: UserDto,
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.usersService.getUserByPharmcyId(id,userDto)
        return user
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @ApiOperation({ summary: 'User Excel Export', description: 'It is the API used to download the list of users to excel' })
    @Get('/excel/export')
    async getUserExcel(
        @Req() request: Request,
        @Query() userDto: UserDto,
    ){
        try {
            const cookie = request.headers.authorization
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.usersService.getUsersExcel(userDto);
        return user
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @ApiOperation({ summary: 'User View', description: 'API that allows the user to see their own information' })
    @Get('/me/user')
    async getUserMe(
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
        const user = await this.usersService.getMe(data.id)
        return user
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @ApiOperation({ summary: 'User Update', description: 'API to be used to update the user' })
    @Patch(':id')
    async updateUsersById(
        @Param('id') id : string,
        @Body() update: UserDto,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
        update.updatedDate = new Date
        update.updatedById = data.id
            const user = await this.usersService.updateUserById(id,update)
            // await this.cacheManager.del('users')
        return user
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @ApiOperation({ summary: 'User Update', description: 'API to be used to verify the users email address' })
    @Get('/verify/:id')
    async verifyUserById(
        @Param('id') id : string
    ){
        const verify = await this.usersService.verifyUserById(id)
        const user = await this.usersService.getUserById(id)
        const verify_html = send_verify_email(id,user.data);
        return verify_html
    }

    @ApiOperation({ summary: 'User Delete', description: 'API to be used to delete the user' })
    @Delete(':id')
    async delUsersById(
        @Param('id') id : string,
        @Req() request: Request
    ){
        try {
            const cookie = request.headers.authorization
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
            const user = await this.usersService.delUserById(id)
            // await this.cacheManager.del('users')
            
            return user 
        } catch (error) {
            return{
                error:error.message,
            }
        }
    }

    @ApiOperation({ summary: 'User Login', description: 'API to be used to login the user' })
    @Post('/login')
    async login(
        @Body('mail') mail: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ){
        const user = await this.usersService.getEmailUser(mail);
        if (user.data === null) {
            throw new UnauthorizedException('user is not defined');
        }
        if (!passwordHash.verify(password, user.data.password)) {
            throw new UnauthorizedException('password is not valid');
        }
        const jwt = await this.jwtService.signAsync({id: user.data.id});
        response.cookie('jwt', jwt, {httpOnly: true});
        const token={
            token:jwt,
            createdById:user?.data.id,
            createdDate: new Date,
            deleted:false
        }
        await this.userTokenService.insertToken(token)
        return {
            status: true,
            token:jwt,
            user:user
        };
    }

    @ApiOperation({ summary: 'User Logout', description: 'API to be used to logout the user' })
    @Post('/logout')
    async logout(
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
        ) {
            const cookie = request.headers.authorization
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
            throw new UnauthorizedException();
        }
        response.clearCookie('jwt');
        await this.userTokenService.deleteToken(cookie)

        return {
            message: 'success'
        }
    }
    
}