import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";
import { UserRequestSchema } from "./userLog.model";

@Module({
    imports: [
        MongooseModule.forFeature([{name:"MedicineUserRequestSchema",schema:UserRequestSchema}]),
        ConfigModule.forRoot({
            isGlobal: true,
          }),
          MongooseModule.forRootAsync({
           imports: [ConfigModule],
           useFactory: async (config: ConfigService) => ({
            uri: config.get<string>('MONGO_DB_USER_REQUEST_URL'),
           }),
           inject: [ConfigService],
         }),
         JwtModule.register({
          secret: 'secret',
          signOptions: {expiresIn: '1d'}
      })
    ],
    controllers:[],
    providers: []
})

export class UserLogModule{ }