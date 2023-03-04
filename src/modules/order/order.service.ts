import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dotenv from 'dotenv'
import { Injectable } from "@nestjs/common";
import { error } from "console";
import { Order } from "./order.model";
import { OrderDto } from "./order.dto";
import { Prescriptions } from "../prescriptions/prescriptions.model";
import { Phamarcy } from "../phamarcy/phamarcy.model";
import axios from 'axios';
import { th } from "date-fns/locale";
dotenv.config();
@Injectable()
export class OrderService{
    constructor(
        @InjectModel('MedicineOrders') private readonly order: Model<Order>,
        @InjectModel('MedicinePrescriptions') private readonly prescriptions: Model<Prescriptions>,
        @InjectModel('MedicinePhamarcy') private readonly phamarcy : Model<Phamarcy>,
    ){}

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