import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService , ConfigModule } from "@nestjs/config";
import { PrescriptionsSchema } from "./prescriptions.model";
import { PrescriptionsController } from "./prescriptions.controller";
import { PrescriptionsService } from "./prescriptions.service";
import { UserSchema } from "../user/user.model";
import { PrescriptionsLogModule } from "../prescriptions-log/prescriptionsLog.module";
import { PrescriptionsLogService } from "../prescriptions-log/prescriptionsLog.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name:"MedicinePrescriptions",schema:PrescriptionsSchema}]),
        MongooseModule.forFeature([{name:"MedicineUser",schema:UserSchema}]),
        ConfigModule.forRoot({
            isGlobal: true,
          }),
          MongooseModule.forRootAsync({
           imports: [ConfigModule],
           useFactory: async (config: ConfigService) => ({
            uri: config.get<string>('MONGO_DB_PRESCRIPTIONS_URL'),
           }),
           inject: [ConfigService],
         }),
         JwtModule.register({
          secret: 'secret',
          signOptions: {expiresIn: '1d'}
      }),
      PrescriptionsLogModule
    ],
    controllers: [
        PrescriptionsController
    ],
    providers: [
        PrescriptionsService,
    ]
})


export class PrescriptionsModule{ 

}