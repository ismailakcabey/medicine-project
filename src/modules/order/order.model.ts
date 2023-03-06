import * as mongoose from "mongoose";

export const OrderSchema= new mongoose.Schema({


    deleted:{
        type: Boolean,
        required: true,
        default: false,
    },

    createdDate:{
        type: Date,
        required: false,
        default: new Date
    },

    updatedDate:{
        type:Date,
        required: false,
        default: new Date,
    },

    fromAdress:{
        type:String,
        required: true
    },

    toAdress:{
        type:String,
        required: true
    },

    status:{
        type:Number,
        required:true,
        default:0
    },

    fromPhoneNumber:{
        type:String,
        required: true
    },

    toPhoneNumber:{
        type:String,
        required: true
    },

    fromUserName:{
        type:String,
        required: true
    },

    toUserName:{
        type:String,
        required: true
    },

    externalId:{
        type:String,
        required: false
    },

    createdById:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    updatedById:{
        type: mongoose.Types.ObjectId,
        required: false,
    },

    pharmcyId:{
        type: mongoose.Types.ObjectId,
        required: false,
    },

    prescriptionsId:{
        type: mongoose.Types.ObjectId,
        required: false,
    },

})

export interface Order extends mongoose.Document{
    id:string,
    deleted:boolean,
    createdDate:Date,
    updatedDate:Date,
    pharmcyId:mongoose.Schema.Types.ObjectId,
    createdById:mongoose.Schema.Types.ObjectId,
    updatedById:mongoose.Schema.Types.ObjectId,
    prescriptionsId:mongoose.Schema.Types.ObjectId,
    toAdress:string,
    fromAdress:string,
    fromPhoneNumber:string,
    toPhoneNumber:string,
    fromUserName:string,
    toUserName:string,
    status:number,
    externalId:string,
}

export interface OrderExcel extends mongoose.Document{
    pharmcyId:mongoose.Schema.Types.ObjectId,
    prescriptionsId:mongoose.Schema.Types.ObjectId,
    toAdress:string,
    fromAdress:string,
    fromPhoneNumber:string,
    toPhoneNumber:string,
    fromUserName:string,
    toUserName:string,
    status:number,
    externalId:string,
}