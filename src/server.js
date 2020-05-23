import express from 'express';
import path from 'path';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use((req, res) => {
  console.log('asdf', __dirname, __filename, path.resolve(__dirname, '../'));
  const statsFile = path.resolve('./public/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  const html = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <App />
    </ChunkExtractorManager>
  );
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags(); // or extractor.getLinkElements();
  // And you can even collect your style tags (if you use "mini-css-extract-plugin")
  const styleTags = extractor.getStyleTags(); // or extractor.getStyleElements();

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
