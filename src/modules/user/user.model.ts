import * as mongoose from "mongoose";
import { Role } from "./user.enum";

export const UserSchema = new mongoose.Schema({
    deleted:{
        type: Boolean,
        required: true,
        default: false,
    },
    role:{
        type: Number,
        required: true,
        default: 3,
        enum: Role
    },
    createdDate:{
        type:Date,
        required: false,
        default: new Date,
    },
    updatedDate:{
        type:Date,
        required: false,
        default: new Date,
    },
    fullName:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    birthDayDate:{
        type:Date,
        required: false,
    },
    mail:{
        type:String,
        required: true
    },
    phoneNumber:{
        type:String,
        required: true
    },
    isMail:{
        type: Boolean,
        required: false,
        default: false,
    },
    pharmcyId:{
        type: mongoose.Types.ObjectId,
        required: false,
    },
    createdById:{
        type: mongoose.Types.ObjectId,
        required: false,
    },
    updatedById:{
        type: mongoose.Types.ObjectId,
        required: false,
    },
    adress:{
        type:String,
        required: false,
    },
    identityId:{
        type:String,
        required:true,
    }
})

export interface User extends mongoose.Document{
    id:string,
    deleted:boolean,
    role:Role,
    createdDate:Date,
    updatedDate:Date,
    fullName:string,
    password:string,
    birthDayDate:Date,
    mail:string,
    phoneNumber:string,
    isMail:boolean,
    pharmcyId:mongoose.Schema.Types.ObjectId,
    createdById:mongoose.Schema.Types.ObjectId,
    updatedById:mongoose.Schema.Types.ObjectId,
    adress:string,
    identityId:string
}

export interface UserExcel extends mongoose.Document{
    fullName:string,
    mail:string;
    adress:string;
    birthDayDate:Date,
    phoneNumber:string,
    identityId:string
}