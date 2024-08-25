import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';

const tag = '🅿️ 🅿️ 🅿️ 🅿️ 🅿️ 🅿️ FakeBank 🅿️ 🅿️';
const logger = new Logger(tag);

config();

async function bootstrap() {
  logger.log(`... really starting the Fake Bank ...`);
  const app = await NestFactory.create(AppModule);
  const status = process.env.STATUS;
  let port = 8080;
  if (status == 'dev') {
    port = 3000;
  }
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}
bootstrap();
