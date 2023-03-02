import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule , ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ScheduleModule } from "@nestjs/schedule";
import { MedicineLogSchema } from "./medicineLog.model";
import { MedicineLogService } from "./medicineLog.service";
import { MedicineLogCron } from "./medicineLog.cron";

@Module({
    imports:[
        MongooseModule.forFeature([{name:"MedicineMedicineLog",schema:MedicineLogSchema}]),
        ConfigModule.forRoot({
            isGlobal:true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
             uri: config.get<string>('MONGO_DB_MEDICINE_LOG_URL'),
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
        MedicineLogService,
        MedicineLogCron
    ],
    exports:[
        MedicineLogService
    ]
})

export class MedicineLogModule{}