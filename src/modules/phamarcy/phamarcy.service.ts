import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PhamarcyDto } from "./phamarcy.dto";
import { Phamarcy, PhamarcyExcel } from "./phamarcy.model";
import * as dotenv from 'dotenv'
import { Injectable } from "@nestjs/common";
import { error } from "console";
import { Role } from "../user/user.enum";
import { User } from "../user/user.model";
import { Prescriptions } from "../prescriptions/prescriptions.model";
import * as AWS from 'aws-sdk';
var fs = require('fs');
const XLSX = require('xlsx');
dotenv.config()

@Injectable()
export class PhamarcyService{
    constructor(
        @InjectModel('MedicinePhamarcy') private readonly phamarcy : Model<Phamarcy>,
        @InjectModel('MedicinePhamarcy') private readonly phamarcyExcel : Model<PhamarcyExcel>,
        @InjectModel('MedicineUser') private readonly user: Model<User>,
        @InjectModel('MedicinePrescriptions') private readonly prescriptions: Model<Prescriptions>,
    ){}

    async getExcel(filter: PhamarcyDto){
        const users = await this.phamarcyExcel.find(filter).exec();
        return users.map(
            user=> ({
                name: user.phamarcyName,
                adress: user.adress,
                phoneNumber: user.phoneNumber,
                medicineCount: user.medicineCount,
            })
        )
    }

    async getPhamarcyExcel(filter: PhamarcyDto){
        const data = await this.getExcel(filter)
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, `phamarcy`)
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        //XLSX.writeFile(workBook, `users.xlsx`)
        const buffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
        const url = this.s3Upload(buffer,"phamarcy","xlsx")
        return{
            status : true,
            message : "Excel file generated",
            workBook : workBook
        }
    }

    async s3Upload(file,fileName,fileType){
        dotenv.config({debug: true});
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          });
        const s3 = new AWS.S3()
        
       try {
        await s3.putObject({
            Body:file,
            Bucket:process.env.AWS_BUCKET,
            Key:`${fileName}${new Date}.${fileType}`
        }).promise()
       } catch (error) {
        console.log(error)
       }
    }
    
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
            const createdUser = await this.user.findOne({_id: phamarcy?.createdById})
            if(createdUser?.role == Role.ADMIN_EMPLOOYE){
            return {
                status: false,
                message:"this user is'nt created phamarcy"
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


    async getPrescriptions(id : string)
    {
        const data = await this.prescriptions.find({pharmcyId:id});
        return {
            status:true,
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
        return {
            status:true,
            data:result
        }
    }

    async deletePhamarcyById(id:string){
        const phamarcy = await this.phamarcy.findByIdAndDelete(id)
        return phamarcy
    }

}