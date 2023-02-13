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
    createdById:{
        type: mongoose.Types.ObjectId,
        required: false,
    },
    body:{
        type:Object,
        required: false,
    },
    cookies:{
        type:Object,
        required: false,
    },
    query:{
        type:Object,
        required: false,
    },
    params:{
        type:Object,
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
    createdById:mongoose.Schema.Types.ObjectId,
    body:object,
    cookies:object,
    query:object,
    params:object,
    method:string,
}