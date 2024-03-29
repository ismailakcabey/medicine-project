import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PhamarcySchema } from "./phamarcy.model";
import { ConfigService , ConfigModule } from "@nestjs/config";
import { PhamarcyService } from "./phamarcy.service";
import { PhamarcyController } from "./phamarcy.controller";
import { UserSchema } from "../user/user.model";
import { PhamarcyLogModule } from "../phamarcy-log/phamarcyLog.module";
import { PrescriptionsModule } from "../prescriptions/prescriptions.module";
import { PrescriptionsSchema } from "../prescriptions/prescriptions.model";

@Module({
    imports: [
        MongooseModule.forFeature([{name:"MedicinePhamarcy",schema:PhamarcySchema}]),
        MongooseModule.forFeature([{name:"MedicineUser",schema:UserSchema}]),
        MongooseModule.forFeature([{name:"MedicinePrescriptions",schema:PrescriptionsSchema}]),
        ConfigModule.forRoot({
            isGlobal: true,
          }),
          MongooseModule.forRootAsync({
           imports: [ConfigModule],
           useFactory: async (config: ConfigService) => ({
            uri: config.get<string>('MONGO_DB_PHAMARCY_URL'),
           }),
           inject: [ConfigService],
         }),
         JwtModule.register({
          secret: 'secret',
          signOptions: {expiresIn: '1d'}
      }),
      PhamarcyLogModule,
      PrescriptionsModule
    ],
    controllers: [
        PhamarcyController
    ],
    providers: [
        PhamarcyService
    ]
})


export class PhamarcyModule{ 

}