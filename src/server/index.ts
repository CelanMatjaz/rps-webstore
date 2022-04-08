/// <reference path="./serverTypes.d.ts" /> 
import dotenv from 'dotenv';
import pgSimple from "connect-pg-simple";
dotenv.config();

import express from 'express';
import session from 'express-session';
import path from 'path';
import frontendRouter from './frontend';
import userRouter from './router/users';
import { Pool } from 'pg';

const publicFolder =
  process.env.NODE_ENV === 'production' ? './public' : './build/debug/public';

const app = express();

const getSecret = () => {
  const secret = process.env.SECRET;
  if(!secret) {
    console.error(
      `
      ============================================
                WARNING! WARNING! WARNING!
      
      Secret is missing in development .env
  
      Terminating here, as the security of your 
      application cannot be guaranteed...
      ============================================
    `);
    process.exit(1);
  }
  return secret;
}

app.use(session({
  store: new (pgSimple(session))({
    conString: process.env.DB,
    tableName: 'sessions',
  }),
  secret: getSecret(),
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30} // 30 days
}))


app.get('/favicon.ico', (req, res) =>
  res.sendFile(path.resolve(publicFolder, 'favicon.ico'))
);
app.use('/public', express.static(path.resolve(publicFolder)));

app.get('/test', (req, res) => res.json({ test: 'test' }));

//write routes here
app.use('/api/account/', userRouter);
app.get('*', frontendRouter);
app.use('*', (req, res) => res.sendStatus(404));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log('Server started on port', PORT));
