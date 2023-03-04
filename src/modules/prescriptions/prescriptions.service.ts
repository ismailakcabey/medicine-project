import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dotenv from 'dotenv'
import { Injectable } from "@nestjs/common";
import { error } from "console";
import { Prescriptions } from "./prescriptions.model";
import { User } from "../user/user.model";
import { PrescriptionsDto } from "./prescriptions.dto";
import { add } from "date-fns";
dotenv.config()

@Injectable()
export class PrescriptionsService{
    constructor(
        @InjectModel('MedicinePrescriptions') private readonly prescriptions: Model<Prescriptions>,
        @InjectModel('MedicineUser') private readonly user: Model<User>,
    ){}

    async insertPrescriptions(prescriptions: PrescriptionsDto){
        try {
            const addPrescriptions = new this.prescriptions(prescriptions)
            addPrescriptions.medicineCount = addPrescriptions.medicines.length
            const result = await addPrescriptions.save()
            return{
                status:true,
                prescriptionsId: result?.id as string,
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getPrescriptions(prescriptions: PrescriptionsDto){
        try {
            const result = await this.prescriptions.find(prescriptions).limit(prescriptions.limit)
            const resultCount = await this.prescriptions.count(prescriptions)
            return{
                status:true,
                count:resultCount,
                data:result,
            }
        } catch (error) {
            console.log(error)
        }
    }


    async getPrescriptionsById(id: string){
        try {
            const result = await this.prescriptions.findById(id)
            return{
                status:true,
                data:result,
            }
        } catch (error) {
            console.log(error)
        }
    }


    async updatePrescriptions(id:string, prescriptions:PrescriptionsDto){
        const result = await this.prescriptions.findByIdAndUpdate(id,prescriptions)
        return{
            status:true,
            data:result,
        }
    }


    async deletePrescriptions(id: string){
        try {
            const result = await this.prescriptions.findByIdAndDelete(id)
            return{
                status:true,
                data:result,
            }
        } catch (error) {
            console.log(error)
        }
    }

}