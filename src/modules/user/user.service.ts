import { Injectable , Inject , forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { UserDto } from "./user.dto";
import { Role } from "./user.enum";
import { User, UserExcel } from "./user.model";
import {JwtService} from "@nestjs/jwt";
const sgMail = require('@sendgrid/mail')
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { send_verify_email } from "./sendEmail";
import { UserRequestService } from "../user-log/userLog.service";
var fs = require('fs');
const XLSX = require('xlsx');
dotenv.config()
const passwordHash = require('password-hash');
import * as AWS from 'aws-sdk';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('MedicineUser') private readonly user: Model<User>,
        @InjectModel('MedicineUser') private readonly userModelExcel: Model<UserExcel>,
        
    ){
    }

    async insertUser(users: UserDto){
        try {
        const addUser = new this.user(users);
        const mailControlUser = await this.user.findOne({mail: addUser?.mail})
        const phoneControlUser = await this.user.findOne({phoneNumber: addUser?.phoneNumber})
        const identitiyControlUser = await this.user.findOne({phoneNumber: addUser?.identityId})
        const createdUser = await this.user.findOne({_id: users?.createdById})
        if(createdUser?.role == Role.ADMIN_EMPLOOYE){
            return {
                status: false,
                message:"this user is'nt created user"
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
        if(addUser.createdById == null && addUser.role == Role.ADMIN_EMPLOOYE){
            return {
                status: false,
                message:"required create user"
            }
        }

        if(addUser.pharmcyId == null && addUser.role == Role.ADMIN_EMPLOOYE){
            return {
                status: false,
                message:"required phamrcy user"
            }
        }
        addUser.password = passwordHash.generate(addUser?.password)
        const result = await addUser.save()
        let email = await this.sendUserVerifyMail(result?.id as string,addUser)
        return{
            status: true,
            message: "user successfully created",
            userId:result?.id as string,
            user:result
        }
        } catch (error) {
            return{
                statusbar: false,
                message: error.message,
            }
        }
    }

    async getAllUser(userDto):Promise<{
        status: boolean,
        data: User[],
        count: number
    }>{
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

    async getEmailUser(email):Promise<{
      status: boolean,
      data: User,
      message: string
  }>{
      const users = await this.user.findOne({ mail: email})
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

    async verifyUserById(id):Promise<boolean>{
        const verifyUser = await this.user.findByIdAndUpdate(id,{isMail:true})
        if(verifyUser){
            return true
        }
        else{
            return false
        }
    }

    async sendUserVerifyMail(id,user:User){
        dotenv.config({debug: true});
        const Mailjet = require('node-mailjet');
        const verify_html = send_verify_email(id,user);
const mailjet = new Mailjet({
    apiKey: process.env.MAIL_JET_API_KEY,
    apiSecret: process.env.MAIL_JET_API_SECRET_KEY
  });
const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: process.env.MAIL_JET_SEND_EMAIL,
                Name: "ECZANE SEPETI"
              },
              To: [
                {
                  Email: user.mail,
                  Name: user.fullName
                }
              ],
              Subject: "Email Doğrulama",
              TextPart: "Mailde yer alan butondan email adresinizi doğrulayabilirsiniz",
              HTMLPart: verify_html
            }
          ]
        })
request
    .then((result) => {
    })
    .catch((err) => {
        console.log(err.statusCode)

    })
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

     async getMe(id):Promise<{
         status: boolean,
         data: User,
     }>{
         try {
             const user = await this.user.findOne({_id: id})
         return{
             status: true,
             data: user
         }
         } catch (error) {
             return {
                 status: false,
                 data: error.data
             }
         }
     }

    async getUserByPharmcyId(id , userDto:UserDto):Promise<{
        status:boolean,
        data:User[],
        count:number
    }>{
        try {
            userDto.pharmcyId = id
            const users = await this.user.find(userDto)
            const usersCount = await this.user.count({pharmcyId:id})
            return {
                status: true,
                count: usersCount,
                data: users,
                
            }
        } catch (error) {
            return {
                status: false,
                data: error.data,
                count: 0
            }
        }
    }

    async getExcel(filter: UserDto){
        const users = await this.userModelExcel.find(filter).exec();
        return users.map(
            user=> ({
                fullName: user.fullName,
                mail: user.mail,
                birthDayDate: user.birthDayDate,
                phoneNumber: user.phoneNumber,
                identityId:user.identityId,
            })
        )
    }

    async s3Upload(file,fileName,fileType){
        dotenv.config({debug: true});
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          });
        const s3 = new AWS.S3()
        
       try {
        await s3.putObject({
            Body:file,
            Bucket:process.env.AWS_BUCKET,
            Key:`${fileName}${new Date}.${fileType}`
        }).promise()
       } catch (error) {
        console.log(error)
       }
    }


    async getUsersExcel(filter: UserDto){
        const data = await this.getExcel(filter)
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, `users`)
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        //XLSX.writeFile(workBook, `users.xlsx`)
        const buffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
        this.s3Upload(buffer,"users","xlsx")
        return{
            status : true,
            message : "Excel file generated",
            workBook : workBook
        }
    }
}