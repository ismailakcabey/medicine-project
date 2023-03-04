import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule , ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ScheduleModule } from "@nestjs/schedule";
import { OrderLogSchema } from "./orderLog.model";
import { OrderLogService } from "./orderLog.service";
import { OrderLogCron } from "./orderLog.cron";

@Module({
    imports:[
        MongooseModule.forFeature([{name:"MedicineOrderLog",schema:OrderLogSchema}]),
        ConfigModule.forRoot({
            isGlobal:true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
             uri: config.get<string>('MONGO_DB_ORDER_LOG_URL'),
            }),
            inject: [ConfigService],
          }),
          JwtModule.register({
           secret: 'secret',
           signOptions: {expiresIn: '1d'}
       }),
       ScheduleModule.forRoot()
    ],
    controllers:[],
    providers:[
        OrderLogService,
        OrderLogCron
    ],
    exports:[
        OrderLogService
    ]
})

export class OrderLogModule{}