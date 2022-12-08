import * as dotenv from 'dotenv';
dotenv.config();

import type { VercelRequest, VercelResponse } from '@vercel/node';

import { createApp } from '../src/server';

export default async (req: VercelRequest, res: VercelResponse) => {
  const app = createApp();

  app.get('/hello', () => {
    return { hello: 'world' };
  });

  await app.ready();

  app.server.emit('request', req, res);
};
