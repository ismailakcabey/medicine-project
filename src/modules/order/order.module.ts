import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService , ConfigModule } from "@nestjs/config";
import { OrderSchema } from "./order.model";
import { PrescriptionsModule } from "../prescriptions/prescriptions.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { PrescriptionsSchema } from "../prescriptions/prescriptions.model";
import { PhamarcySchema } from "../phamarcy/phamarcy.model";

@Module({
    imports: [
        MongooseModule.forFeature([{name:"MedicineOrders",schema:OrderSchema}]),
        MongooseModule.forFeature([{name:"MedicinePrescriptions",schema:PrescriptionsSchema}]),
        MongooseModule.forFeature([{name:"MedicinePhamarcy",schema:PhamarcySchema}]),
        ConfigModule.forRoot({
            isGlobal: true,
          }),
          MongooseModule.forRootAsync({
           imports: [ConfigModule],
           useFactory: async (config: ConfigService) => ({
            uri: config.get<string>('MONGO_DB_ORDERS_URL'),
           }),
           inject: [ConfigService],
         }),
         JwtModule.register({
          secret: 'secret',
          signOptions: {expiresIn: '1d'}
      }),
      PrescriptionsModule
    ],
    controllers: [
        OrderController
    ],
    providers: [
        OrderService
    ]
})


export class OrderModule{ 

}