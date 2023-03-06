import * as mongoose from "mongoose";
import { MedicineSchema , Medicine} from "../medicine/medicine.model";

export const PhamarcySchema = new mongoose.Schema({

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

    phamarcyName:{
        type:String,
        required: true
    },

    adress:{
        type:String,
        required: true
    },

    medicineCount:{
        type: Number,
        default: 0,
        required: false
    },

    medicines:{
        type: [MedicineSchema],
        required: false,
    },

    phoneNumber:{
        type:String,
        required: true
    },

    createdById:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    updatedById:{
        type: mongoose.Types.ObjectId,
        required: false,
    },

})

export interface Phamarcy extends mongoose.Document{
    id:string,
    deleted:boolean,
    createdDate:Date,
    updatedDate:Date,
    phamarcyName:string,
    adress:string,
    medicineCount:number,
    phoneNumber:string,
    createdById:mongoose.Schema.Types.ObjectId,
    updatedById:mongoose.Schema.Types.ObjectId,
    medicines: Array<Medicine>
}

export interface PhamarcyExcel extends mongoose.Document{
    phamarcyName:string,
    adress:string,
    medicineCount:number,
    phoneNumber:string,
}