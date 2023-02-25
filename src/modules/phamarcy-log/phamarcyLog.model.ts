import * as mongoose from "mongoose";

export const PhamarcyLogSchema = new mongoose.Schema({
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
        type:Object,
        required: false,
    },
    cookies:{
        type:String,
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

    ip:{
        type:String,
        required: false,
    },

    url:{
        type:String,
        required: false,
    },

})

export interface PhamarcyLog extends mongoose.Document{
    id:string,
    deleted:boolean,
    createdDate:Date,
    body:object,
    cookies:string,
    query:object,
    params:object,
    method:string,
    ip:string,
    url:string,
}