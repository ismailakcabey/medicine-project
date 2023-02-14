import * as mongoose from "mongoose";
import { UserRequestType } from "./userLog.enum";

export const UserRequestSchema = new mongoose.Schema({
    deleted:{
        type: Boolean,
        required: true,
        default: false,
    },
    createdDate:{
        type:Date,
        required: false,
        default: new Date,
    },
    body:{
        type:String,
        required: false,
    },
    cookies:{
        type:String,
        required: false,
    },
    query:{
        type:String,
        required: false,
    },
    params:{
        type:String,
        required: false,
    },
    method:{
        type:String,
        required: false,
    },
});

export interface UserReq extends mongoose.Document{
    id:string,
    deleted:boolean,
    createdDate:Date,
    body:string,
    cookies:string,
    query:string,
    params:string,
    method:string,
}