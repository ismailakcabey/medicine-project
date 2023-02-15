import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserTokenSchema } from "./userToken.model";
import { JwtModule } from "@nestjs/jwt";
import { UserTokenService } from "./userToken.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name:"MedicineUserToken",schema:UserTokenSchema}]),
        ConfigModule.forRoot({
            isGlobal:true,
        }),
        MongooseModule.forRootAsync({
            imports:[ConfigModule],
            useFactory: async (config: ConfigService)=> ({
                uri: config.get<string>('MONGO_DB_USER_TOKEN_URL'),
            }),
            inject: [ConfigService],
        }),
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'}
        }),
    ],
    controllers:[],
    providers: [
       UserTokenService
      ],
      exports: [
        UserTokenService
      ]
})

export class UserTokenModule{}