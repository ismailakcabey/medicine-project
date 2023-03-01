import * as mongoose from "mongoose";

export const MedicineSchema = new mongoose.Schema({

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

    name:{
        type: String,
        required: true,
    },

    barcode:{
        type: String,
        required: true
    },

    atccode:{
        type: String,
        required: true
    },

    atcName:{
        type: String,
        required: true
    },

    componayName:{
        type: String,
        required: true
    },

    prescriptions:{
        type: String,
        required: true
    },

    desc:{
        type: String,
        required: false
    },

    childEssentialMedicineList:{
        type: String,
        required: false
    },

    babyEssentialMedicineList:{
        type: String,
        required: false
    },

    createdById:{
        type: mongoose.Types.ObjectId,
        required: false,
    },
    updatedById:{
        type: mongoose.Types.ObjectId,
        required: false,
    },

})

export interface Medicine extends mongoose.Document{
    id:string,
    deleted:boolean,
    createdDate:Date,
    updatedDate:Date,
    createdById:mongoose.Schema.Types.ObjectId,
    updatedById:mongoose.Schema.Types.ObjectId,
    babyEssentialMedicineList:string,
    name:string,
    barcode:string,
    atccode:string,
    atcName:string,
    componayName:string,
    childEssentialMedicineList:string,
    desc:string,
    prescriptions:string,
}