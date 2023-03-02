import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dotenv from 'dotenv'
import { MedicineLog } from "./medicineLog.model";
import { MedicineLogDto } from "./medicineLog.dto";
dotenv.config()

export class MedicineLogService {
    constructor(
        @InjectModel('MedicineMedicineLog') private readonly medicineLog: Model<MedicineLog>
    ){}

    async insertLog(log:MedicineLogDto){
        try {
            const addReq = new this.medicineLog(log)
            const result = await addReq.save()
            return{
                status: true,
                message: "log successfully created",
                userId:result?.id as string,
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteReq(){
        try {
        const result = await this.medicineLog.deleteMany({delete:false , method:'GET'})
        return{
            status: true
        }
        } catch (error) {
            console.log(error)
        }
    }
}