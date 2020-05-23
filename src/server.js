import express from 'express';
import path from 'path';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';

const app = express();
const port = 3000;

app.use(express.static(path.resolve('./build/client/')));

app.use((req, res) => {
  const statsFile = path.resolve('./build/client/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  const html = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <App />
    </ChunkExtractorManager>
  );

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>
      <body>
        <div id="root">${html}</div>

        ${extractor.getScriptTags()}
      </body>
    </html>`);
});
app.listen(port, () => console.log('Server at 3000'));
