import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('handlebars');
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();