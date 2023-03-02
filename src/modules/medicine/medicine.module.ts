import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService , ConfigModule } from "@nestjs/config";
import { MedicineSchema } from "./medicine.model";
import { MedicineService } from "./medicine.service";
import { MedicineController } from "./medicine.controller";
import { LoggerMedicineMiddleware } from "./logger.medicine.middleware";
@Module({
    imports: [
        MongooseModule.forFeature([{name:"MedicineMedicine",schema:MedicineSchema}]),
        ConfigModule.forRoot({
            isGlobal: true,
          }),
          MongooseModule.forRootAsync({
           imports: [ConfigModule],
           useFactory: async (config: ConfigService) => ({
            uri: config.get<string>('MONGO_DB_MEDICINE_URL'),
           }),
           inject: [ConfigService],
         }),
         JwtModule.register({
          secret: 'secret',
          signOptions: {expiresIn: '1d'}
      }),
    ],
    controllers: [
        MedicineController
    ],
    providers: [
        MedicineService,
    ]
})


export class MedicineModule{ 

}