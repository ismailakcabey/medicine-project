import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dotenv from 'dotenv'
import { PrescriptionsLog } from "./prescriptionsLog.model";
import { PrescriptionsLogDto } from "./prescriptionsLog.dto";
dotenv.config()

export class PrescriptionsLogService {
    constructor(
        @InjectModel('MedicinePrescriptionsLog') private readonly prescriptionsLog: Model<PrescriptionsLog>
    ){}

    async insertLog(log:PrescriptionsLogDto){
        try {
            const addReq = new this.prescriptionsLog(log)
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
        const result = await this.prescriptionsLog.deleteMany({delete:false , method:'GET'})
        return{
            status: true
        }
        } catch (error) {
            console.log(error)
        }
    }
}