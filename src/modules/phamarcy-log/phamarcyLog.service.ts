import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PhamarcyLog } from "./phamarcyLog.model";
import * as dotenv from 'dotenv'
import { PhamarcyLogDto } from "./phamarcyLog.dto";
dotenv.config()

export class PhamarcyLogService {
    constructor(
        @InjectModel('MedicinePhamarcyLog') private readonly phamarcyLog: Model<PhamarcyLog>
    ){}

    async insertLog(log:PhamarcyLogDto){
        try {
            const addReq = new this.phamarcyLog(log)
            const result = await addReq.save()
            return{
                status: true,
                message: "user successfully created",
                userId:result?.id as string,
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteReq(){
        try {
        const result = await this.phamarcyLog.deleteMany({delete:false , method:'GET'})
        return{
            status: true
        }
        } catch (error) {
            console.log(error)
        }
    }
}