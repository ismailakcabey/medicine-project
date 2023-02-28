import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import {JwtModule} from "@nestjs/jwt";
import { LoggerUserMiddleware } from './modules/user/logger.user.middleware';
import { UsersController } from './modules/user/user.controller';
import { UserLogModule } from './modules/user-log/userLog.module'
import { UserTokenModule } from './modules/user-token/userToken.module';
import { PhamarcyModule } from './modules/phamarcy/phamarcy.module';
import { LoggerPhamarcyMiddleware } from './modules/phamarcy/logger.phamarcy.middleware';
import { PhamarcyController } from './modules/phamarcy/phamarcy.controller';
import { PhamarcyLogModule } from './modules/phamarcy-log/phamarcyLog.module';
@Module({
  imports: [
    UserModule,
    UserLogModule,
    UserTokenModule,
    PhamarcyModule,
    PhamarcyLogModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
  }),
  CacheModule.register({
    ttl:500000,
    isGlobal:true,
    //max:1000
})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerUserMiddleware).forRoutes(UsersController),
      consumer.apply(LoggerPhamarcyMiddleware).forRoutes(PhamarcyController)
  }
}
