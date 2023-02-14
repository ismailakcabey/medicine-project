import { forwardRef, Injectable, Module } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";
import { UserRequestService } from "../user-log/userLog.service";
import { UserLogModule } from "../user-log/userLog.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name:"MedicineUser",schema:UserSchema}]),
        ConfigModule.forRoot({
            isGlobal: true,
          }),
          MongooseModule.forRootAsync({
           imports: [ConfigModule],
           useFactory: async (config: ConfigService) => ({
            uri: config.get<string>('MONGO_DB_USER_URL'),
           }),
           inject: [ConfigService],
         }),
         JwtModule.register({
          secret: 'secret',
          signOptions: {expiresIn: '1d'}
      }),
      UserLogModule
    ],
    controllers: [UsersController],
    providers: [UserService,
    ]
})


export class UserModule{ 

}