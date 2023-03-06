import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dotenv from 'dotenv'
import { Injectable } from "@nestjs/common";
import { error } from "console";
import { Prescriptions, PrescriptionsExcel } from "./prescriptions.model";
import { User } from "../user/user.model";
import { PrescriptionsDto } from "./prescriptions.dto";
import { add } from "date-fns";
import * as AWS from 'aws-sdk';
var fs = require('fs');
const XLSX = require('xlsx');
dotenv.config()

@Injectable()
export class PrescriptionsService{
    constructor(
        @InjectModel('MedicinePrescriptions') private readonly prescriptions: Model<Prescriptions>,
        @InjectModel('MedicinePrescriptions') private readonly prescriptionsExcel: Model<PrescriptionsExcel>,
        @InjectModel('MedicineUser') private readonly user: Model<User>,
    ){}

    async getExcel(filter: PrescriptionsDto){
        const users = await this.prescriptionsExcel.find(filter).exec();
        return users.map(
            user=> ({
                name: user.name,
                phoneNumber: user.phoneNumber,
                medicineCount: user.medicineCount,
            })
        )
    }

    async getPrescriptionsExcel(filter: PrescriptionsDto){
        const data = await this.getExcel(filter)
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, `prescriptions`)
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        //XLSX.writeFile(workBook, `users.xlsx`)
        const buffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
        const url = this.s3Upload(buffer,"prescriptions","xlsx")
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