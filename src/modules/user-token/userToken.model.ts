import * as mongoose from "mongoose"

export const UserTokenSchema = new mongoose.Schema({
    
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

    token:{
        type:String,
        required: true
    },

    createdById:{
        type: mongoose.Types.ObjectId,
        required: false,
    },

})

export interface UserToken extends mongoose.Document{
    id:string,
    deleted:boolean,
    createdById:mongoose.Schema.Types.ObjectId,
    token:string,
    createdDate:Date,
}