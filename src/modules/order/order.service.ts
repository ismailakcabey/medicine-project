import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dotenv from 'dotenv'
import { Injectable } from "@nestjs/common";
import { error } from "console";
import { Order, OrderExcel } from "./order.model";
import { OrderDto } from "./order.dto";
import { Prescriptions } from "../prescriptions/prescriptions.model";
import { Phamarcy } from "../phamarcy/phamarcy.model";
import axios from 'axios';
import { th } from "date-fns/locale";
import * as AWS from 'aws-sdk';
var fs = require('fs');
const XLSX = require('xlsx');
dotenv.config();
@Injectable()
export class OrderService{
    constructor(
        @InjectModel('MedicineOrders') private readonly order: Model<Order>,
        @InjectModel('MedicineOrders') private readonly orderExcel: Model<OrderExcel>,
        @InjectModel('MedicinePrescriptions') private readonly prescriptions: Model<Prescriptions>,
        @InjectModel('MedicinePhamarcy') private readonly phamarcy : Model<Phamarcy>,
    ){}

    async getExcel(filter: OrderDto){
        const users = await this.orderExcel.find(filter).exec();
        return users.map(
            user=> ({
                externalId: user.externalId,
                toAdress: user.toAdress,
                toUserName: user.toUserName,
                toPhoneNumber: user.toPhoneNumber,
                fromAdress: user.fromAdress,
                fromUserName: user.fromUserName,
                fromPhoneNumber: user.fromPhoneNumber,
                eczane: user.pharmcyId,
                recete: user.prescriptionsId
            })
        )
    }

    async getOrderExcel(filter: OrderDto){
        const data = await this.getExcel(filter)
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, `order`)
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        //XLSX.writeFile(workBook, `users.xlsx`)
        const buffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
        const url = this.s3Upload(buffer,"order","xlsx")
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

    async orderCreate(result:any){
        dotenv.config({debug: true});
        const {data} = await axios.post(process.env.ENDPOINT, {
            deliveryType: 0,
            externalOrderId: result?.id as string,
            from:{
                address:{
                    fullAddress:result.fromAdress
                },
                userInfo:{
                    fullName:result.fromUserName,
                    phoneNumber:result.fromPhoneNumber
                },
                extra:{

                }
            },
            to:{
                address:{
                    fullAddress:result.toAdress
                },
                userInfo:{
                    fullName:result.toUserName,
                    phoneNumber:result.toPhoneNumber
                },
                extra:{
                    
                }
            },
            quantities:[
                {
                    quantity:1,
                    sizeDesi:8
                }
            ],
            callbackUrl:"http://localhost:3000/order/callBack"
}, {
headers: {
  'Content-Type': 'application/json',
  'Authorization':process.env.TOKEN
}
})
return data
    }


    async insertOrder(orders: OrderDto){
        try {
            
            const addOrder = new this.order(orders)
            const prescriptions = await this.prescriptions.findById(orders.prescriptionId)
            const phamarcy = await this.phamarcy.findById(prescriptions.pharmcyId)
            addOrder.fromAdress= prescriptions.adress
            addOrder.fromPhoneNumber = prescriptions.phoneNumber
            addOrder.pharmcyId = prescriptions.pharmcyId
            addOrder.fromUserName = phamarcy.phamarcyName
            const result = await addOrder.save()
            const order = await this.orderCreate(result)
            const updateData= {
                // @ts-ignore
                status:order?.data.status,
                // @ts-ignore
                externalId:order?.data.orderNumber
            }
            const updateOrder = await this.order.findByIdAndUpdate(result.id as string, updateData)
            return{
                status:true,
                prescriptionsId: result?.id as string,
            }
        } catch (error) {
            console.error(error)
        }
    }

    async updateOrder(id:string,orders:OrderDto){
        const result = await this.order.findByIdAndUpdate(id,orders);
        return result
    }

    async callBackOrder(id:string,orders:any){
        const status = orders.status_id
        const result = await this.order.findByIdAndUpdate(id,{status:status});
        return result
    }

    async getOrderById(id:string){
        const result = await this.order.findById(id);
        return result
    }

    async getOrderByPhamarcyId(id,filter:OrderDto){
        const result = await this.order.find({pharmcyId:id}).limit(filter.limit);
        const resultCount = await this.order.count({pharmcyId:id})
        return {
            status:true,
            count:resultCount,
            data:result
        }
    }

    async getOrders(orders:OrderDto):Promise<{
        status:boolean,
        count:number,
        data: Order[],
    }>{
        const result = await this.order.find(orders).limit(orders.limit);
        const resultCount = await this.order.count(orders)
        return{
            status:true,
            count:resultCount,
            data:result
        }
    }
}