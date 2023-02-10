import { Controller,
Post,
Put,
Patch,
Delete,
Get,
Param,
Body, 
Query
} from "@nestjs/common";
import { Filter } from "mongodb";
import { filter } from "rxjs";
import { UserDto } from "./user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('users')
export class UsersController{
    constructor(
        private readonly usersService:UserService,
    ){}

    @Post()
    async insertUser(
        @Body() addUser : UserDto
    ){
        return await this.usersService.insertUser(addUser)
    }

    @Get()
    async getAllUsers(
        @Query() userDto: UserDto
    ){
        const users = await this.usersService.getAllUser(userDto)
        return users
    }

    @Get(':id')
    async getUsersById(
        @Param('id') id : string
    ){
        const user = await this.usersService.getUserById(id)
        return user
    }

    @Patch(':id')
    async updateUsersById(
        @Param('id') id : string,
        @Body() update: UserDto
    ){
        const user = await this.usersService.updateUserById(id,update)
        return user
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
        @Param('id') id : string
    ){
        const user = await this.usersService.delUserById(id)
        return user
    }
}