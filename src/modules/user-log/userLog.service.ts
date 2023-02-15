import { Injectable  } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {JwtService} from "@nestjs/jwt";
import { UserReq, UserRequestSchema } from "./userLog.model";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { UserLogDto } from "./userLog.dto";
dotenv.config()

export class UserRequestService {
    constructor(
        @InjectModel('MedicineUserRequest') private readonly userReq: Model<UserReq>
    ){}

    async insertRequest(req : UserLogDto){
        try {
        const addReq = new this.userReq(req);
        const result = await addReq.save()
        return{
            status: true,
            message: "user successfully created",
            userId:result?.id as string,
        }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteReq(){
        try {
        const result = await this.userReq.deleteMany({delete:false , method:'GET'})
        return{
            status: true
        }
        } catch (error) {
            console.log(error)
        }
    }

}