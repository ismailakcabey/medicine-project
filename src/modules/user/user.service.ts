import { Injectable  } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./user.dto";
import { Role } from "./user.enum";
import { User } from "./user.model";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('MedicineUser') private readonly user: Model<User>
    ){}
    
    async insertUser(users: UserDto){
        const addUser = new this.user(users);
        const mailControlUser = await this.user.findOne({mail: addUser?.mail})
        const phoneControlUser = await this.user.findOne({phoneNumber: addUser?.phoneNumber})
        const identitiyControlUser = await this.user.findOne({phoneNumber: addUser?.identityId})
        if(phoneControlUser){
            return {
                status: false,
                message:"this user is already phone number"
            }
        }
        if(mailControlUser){
            return {
                status: false,
                message:"this user is already mail address"
            }
        }
        if(identitiyControlUser){
            return {
                status: false,
                message:"this user is already identitiy id"
            }
        }
        const result = await addUser.save()
        return{
            status: true,
            message: "user successfully created",
            userId:result?.id as string,
        }
    }

    async getAllUser(userDto):Promise<{
        status: boolean,
        data: User[],
        count: number
    }>{
        console.log(userDto)
        console.log("DENEME")
        const users = await this.user.find(userDto).limit(userDto?.limit)
        const usersCount = await this.user.count(userDto)
        return {
            status: true,
            count: usersCount,
            data: users
        }
    }

    async getUserById(id):Promise<{
        status: boolean,
        data: User,
        message: string
    }>{
        const users = await this.user.findById(id)
        return {
            status: true,
            message:"success",
            data: users,
        }
    }

    async updateUserById(id , update):Promise<{
        status: boolean,
        message: string,
    }>{
        const mailControlUser = await this.user.findOne({mail: update?.mail})
        const phoneControlUser = await this.user.findOne({phoneNumber: update?.phoneNumber})
        const identitiyControlUser = await this.user.findOne({phoneNumber: update?.identityId})
        update.updatedDate = Date.now()
        if(update.id){
            return {
                status: false,
                message:"id is not updated",
            }
        }
        if(phoneControlUser){
            return {
                status: false,
                message:"this user is already phone number",
            }
        }
        if(mailControlUser){
            return {
                status: false,
                message:"this user is already mail address"
            }
        }
        if(identitiyControlUser){
            return {
                status: false,
                message:"this user is already identitiy id"
            }
        }
        const updateUser = await this.user.findByIdAndUpdate(id, update)
        return {
            status: true,
            message: "updated user successfully",
        }
    }

    async delUserById(id):Promise<{
        status: boolean,
        message: string,
    }>{
        const users = await this.user.findByIdAndDelete(id)
        return {
            status: true,
            message: "deleted user successfully"
        }
    }

}