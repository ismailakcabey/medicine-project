import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";
import { UserRequestSchema } from "./userLog.model";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { UserRequestService } from "./userLog.service";
import { ScheduleModule } from '@nestjs/schedule'
import { UserLogCron } from "./userLog.cron";


@Module({
    imports: [
        MongooseModule.forFeature([{name:"MedicineUserRequest",schema:UserRequestSchema}]),
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
      }),
      ScheduleModule.forRoot()
    ],
    controllers:[],
    providers: [
      UserRequestService,
      UserLogCron,
    ],
    exports: [
      UserRequestService,
    ]
})

export class UserLogModule{ }