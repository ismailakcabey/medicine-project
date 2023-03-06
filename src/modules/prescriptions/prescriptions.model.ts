import * as mongoose from "mongoose";
import { Medicine, MedicineSchema } from "../medicine/medicine.model";

export const PrescriptionsSchema = new mongoose.Schema({

    deleted:{
        type: Boolean,
        required: true,
        default: false,
    },

    createdDate:{
        type: Date,
        required: true,
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

    createdById:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    updatedById:{
        type: mongoose.Types.ObjectId,
        required: false,
    },

    medicineCount:{
        type: Number,
        require:false,
        default:0
    },

    pharmcyId:{
        type: mongoose.Types.ObjectId,
        required: false,
    },

    medicines:{
        type: [MedicineSchema],
        required: false,
    },

    phoneNumber:{
        type:String,
        required: true
    },

    adress:{
        type:String,
        required: true
    },

})

export interface Prescriptions extends mongoose.Document{
    id:string,
    deleted:boolean,
    createdDate:Date,
    updatedDate:Date,
    pharmcyId:mongoose.Schema.Types.ObjectId,
    createdById:mongoose.Schema.Types.ObjectId,
    updatedById:mongoose.Schema.Types.ObjectId,
    adress:string,
    name:string,
    phoneNumber:string,
    medicines: Array<Medicine>,
    medicineCount:number
}

export interface PrescriptionsExcel extends mongoose.Document{
    name:string,
    phoneNumber:string;
    medicineCount:number;
}