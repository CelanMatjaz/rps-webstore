import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import frontendRouter from './frontend';

const publicFolder =
  process.env.NODE_ENV === 'production' ? './public' : './build/debug/public';

const app = express();

app.get('/favicon.ico', (req, res) =>
  res.sendFile(path.resolve(publicFolder, 'favicon.ico'))
);
app.use('/public', express.static(path.resolve(publicFolder)));

app.get('/test', (req, res) => res.json({ test: 'test' }));

//write routes here

app.get('*', frontendRouter);
app.use('*', (req, res) => res.sendStatus(404));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log('Server started on port', PORT));
