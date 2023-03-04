import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dotenv from 'dotenv'
import { OrderLog } from "./orderLog.model";
import { OrderLogDto } from "./orderLog.dto";
dotenv.config()

export class OrderLogService {
    constructor(
        @InjectModel('MedicineOrderLog') private readonly orderLog: Model<OrderLog>
    ){}

    async insertLog(log:OrderLogDto){
        try {
            const addReq = new this.orderLog(log)
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
        const result = await this.orderLog.deleteMany({delete:false , method:'GET'})
        return{
            status: true
        }
        } catch (error) {
            console.log(error)
        }
    }
}