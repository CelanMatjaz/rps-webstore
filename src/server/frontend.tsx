import * as React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { store } from '../client/store/store';
import App from '../client/app';

const router = express.Router();

router.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(createMarkup(req.originalUrl));
});

export default router;

function createMarkup(url: string) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="favicon" href="/public/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Title</title>
    <script defer src="/public/main.bundle.js"></script><link href="/public/main.css" rel="stylesheet"></head>
    <body>
    <div id="root">${renderToString(
      <React.StrictMode>
        <Provider store={store}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </React.StrictMode>
    )}</div>
    </body>
  </html>`;
}
