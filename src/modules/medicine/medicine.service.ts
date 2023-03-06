import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dotenv from 'dotenv'
import { Injectable } from "@nestjs/common";
import { error } from "console";
import { Medicine, MedicineExcel } from "./medicine.model";
import { MedicineDto } from "./medicine.dto";
const axios = require('axios');
import * as AWS from 'aws-sdk';
var fs = require('fs');
const XLSX = require('xlsx');
dotenv.config()

@Injectable()
export class MedicineService{
    constructor(
        @InjectModel('MedicineMedicine') private readonly medicine : Model<Medicine>,
        @InjectModel('MedicineMedicine') private readonly medicineExcel : Model<MedicineExcel>
    ){}

    async getExcel(filter: MedicineDto){
        const users = await this.medicineExcel.find(filter).exec();
        return users.map(
            user=> ({
                babyEssentialMedicineList:user.babyEssentialMedicineList,
    name:user.name,
    barcode:user.barcode,
    atccode:user.atccode,
    atcName:user.atcName,
    componayName:user.componayName,
    childEssentialMedicineList:user.childEssentialMedicineList,
    desc:user.desc,
    prescriptions:user.prescriptions,
            })
        )
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

    async getMedicineExcel(filter: MedicineDto){
        const data = await this.getExcel(filter)
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, `medicine`)
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        //XLSX.writeFile(workBook, `users.xlsx`)
        const buffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
        const url = this.s3Upload(buffer,"medicine","xlsx")
        return{
            status : true,
            message : "Excel file generated",
            workBook : workBook
        }
    }

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

    async medicineUpdate(id:string,medicines: MedicineDto){
        try {
        const result = await this.medicine.findByIdAndUpdate(id,medicines)
        return{
            status:true,
            medicineId: result
        }
        } catch (error) {
         console.log(error)   
        }
    }

    async medicineDel(id: string){
        try {
            const result = await this.medicine.findByIdAndDelete(id)
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

    async getMedicineById(id: string):Promise<{
        status:boolean,
        data: Medicine
    }>{
        const data =  await this.medicine.findById(id);
        return {
            status:true,
            data: data
        }
    }
}