import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dotenv from 'dotenv'
import { Injectable } from "@nestjs/common";
import { error } from "console";
import { Medicine } from "./medicine.model";
import { MedicineDto } from "./medicine.dto";
const axios = require('axios');
dotenv.config()

@Injectable()
export class MedicineService{
    constructor(
        @InjectModel('MedicineMedicine') private readonly medicine : Model<Medicine>
    ){}

    async medicineInsert(medicines: MedicineDto){
        try {
            const addMedicine= new this.medicine(medicines)
        const result = await addMedicine.save()
        return{
            status:true,
            medicineId: result?.id as string,
        }
        } catch (error) {
         console.log(error)   
        }
    }

    async getMedicine(filter: MedicineDto):Promise<{
        status:boolean,
        count:number,
        data: Medicine[],
    }>{
        const data =  await this.medicine.find(filter).limit(filter?.limit)
        const dataCount = await this.medicine.count(filter)
        return {
            status:true,
            count:dataCount,
            data: data
        }
    }
}