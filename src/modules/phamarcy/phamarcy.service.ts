import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PhamarcyDto } from "./phamarcy.dto";
import { Phamarcy } from "./phamarcy.model";
import * as dotenv from 'dotenv'
import { Injectable } from "@nestjs/common";
import { error } from "console";
dotenv.config()

@Injectable()
export class PhamarcyService{
    constructor(
        @InjectModel('MedicinePhamarcy') private readonly phamarcy : Model<Phamarcy>
    ){}

    
    async insertPhamarcy(phamarcy: PhamarcyDto){
        try {
            const addPhamarcy = new this.phamarcy(phamarcy)
            const controlPhoneNumber = await this.phamarcy.findOne({phoneNumber: addPhamarcy.phoneNumber})
            if (controlPhoneNumber){
                return{
                    status:false,
                    message:"already phone number"
                }
            }
            const result = await addPhamarcy.save()
            return{
                status:true,
                phamarcyId: result?.id as string,
            }
        } catch (error) {
            return{
                status:false,
                message: error.message
            }
        }
    }


    async getPhamarcy(filter : PhamarcyDto):Promise<{
        status:boolean,
        count:number,
        data: Phamarcy[],
    }>
    {
        const data = await this.phamarcy.find(filter).limit(filter?.limit)
        const dataCount = await this.phamarcy.count(filter)
        return {
            status:true,
            count:dataCount,
            data: data
        }
    }

    async getPhamarcyById(id:string){
        const phamarcy = await this.phamarcy.findById(id)
        return phamarcy
    }

    async updatePhamarcy(id:string,phamarcy:PhamarcyDto){
        const phoneControlPhamarcy = await this.phamarcy.findOne({phoneNumber: phamarcy?.phoneNumber})
        if(phoneControlPhamarcy){
            return {
                status:false,
                data: "phoneNumber is already use"
            }
        }
        const result = await this.phamarcy.findByIdAndUpdate(id,phamarcy)
        return result
    }

    async deletePhamarcyById(id:string){
        const phamarcy = await this.phamarcy.findByIdAndDelete(id)
        return phamarcy
    }

}