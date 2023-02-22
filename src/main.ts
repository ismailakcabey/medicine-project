import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule , DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3001'],
    credentials: true,
  };
  app.enableCors(corsOptions);
  const config = new DocumentBuilder().setTitle('Medicine Web Services').
  setLicense('Github','https://github.com/ismailakcabey').
  setDescription('this is a medicine web service').
  setVersion('!.0').addTag('Medicine Service').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
