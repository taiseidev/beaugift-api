import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import helmet from 'helmet';
import { config } from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';
config();

const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  // ここにセキュリティについての設定を追加する
  app.use(helmet());
  app.enableCors();

  console.log('the server is starting @ firebase');
  return app.init();
};

createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);
