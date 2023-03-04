import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule , ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ScheduleModule } from "@nestjs/schedule";
import { PrescriptionsLogSchema } from "./prescriptionsLog.model";
import { PrescriptionsLogService } from "./prescriptionsLog.service";
import { PrescriptionsLogCron } from "./prescriptionsLog.cron";

@Module({
    imports:[
        MongooseModule.forFeature([{name:"MedicinePrescriptionsLog",schema:PrescriptionsLogSchema}]),
        ConfigModule.forRoot({
            isGlobal:true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
             uri: config.get<string>('MONGO_DB_PRESCRIPTIONS_LOG_URL'),
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
        PrescriptionsLogService,
        PrescriptionsLogCron
    ],
    exports:[
        PrescriptionsLogService
    ]
})

export class PrescriptionsLogModule{}