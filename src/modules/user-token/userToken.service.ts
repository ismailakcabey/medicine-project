import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserToken } from "./userToken.model";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { UserTokenDto } from "./userToken.dto";
import { UserDto } from "../user/user.dto";
dotenv.config()

export class UserTokenService{
    constructor(
        @InjectModel('MedicineUserToken') private readonly userToken: Model<UserToken>
    ){}

    async insertToken(token : UserTokenDto){
        try {
        const addToken = new this.userToken(token);
        const result = await addToken.save()
        return{
            status: true,
            message: "token successfully created",
            userId:result?.id as string,
        }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteToken(token : string){
        try {
            const result = await this.userToken.findOneAndDelete({token: token})
        return{
            status: true,
            message: "token successfully delete",
            token: result?.id as string
        }
        } catch (error) {
            console.log(error)
        }
    }

    async getToken(token : string){
        try {
            const result = await this.userToken.findOne({token: token})
        if(result){
            return{
                status: true,
                message: "token find",
                token: result
            }
        }
        else{
            return{
                status: false,
                message: "token not defined",
            }
        }
        } catch (error) {
            console.log(error)
        }
    }

    async getTokenUser(token : string){
        try {
            const result = await this.userToken.findOne({token: token})
        return result.id
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(id : string){
        try {
            const result = await this.userToken.findOne({createdById: id})
        return result
        } catch (error) {
            console.log(error)
        }
    }


}