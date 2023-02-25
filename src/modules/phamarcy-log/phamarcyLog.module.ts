import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule , ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PhamarcyLogSchema } from "./phamarcyLog.model";
import { ScheduleModule } from "@nestjs/schedule";
import { PhamarcyLogService } from "./phamarcyLog.service";
import { PhamarcyLogCron } from "./phamarcyLog.cron";

@Module({
    imports:[
        MongooseModule.forFeature([{name:"MedicinePhamarcyLog",schema:PhamarcyLogSchema}]),
        ConfigModule.forRoot({
            isGlobal:true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
             uri: config.get<string>('MONGO_DB_PHAMARCY_LOG_URL'),
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
        PhamarcyLogService,
        PhamarcyLogCron
    ],
    exports:[
        PhamarcyLogService
    ]
})

export class PhamarcyLogModule{}