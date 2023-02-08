import { Module } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    ],
    controllers: [UsersController],
    providers: [UserService]
})

export class UserModule{ }