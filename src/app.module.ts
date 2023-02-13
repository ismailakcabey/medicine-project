import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import {JwtModule} from "@nestjs/jwt";
import { LoggerUserMiddleware } from './modules/user/logger.user.middleware';
import { UsersController } from './modules/user/user.controller';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerUserMiddleware).forRoutes(UsersController)
  }
}
