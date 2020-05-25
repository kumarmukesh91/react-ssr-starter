import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import serialize from 'serialize-javascript';

import routeConfig from '../routeConfig';

const statsFile = path.resolve('./build/client/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });

export default (req, store) => {
  const html = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <Provider store={store}>
        <StaticRouter context={{}} location={req.path}>
          {renderRoutes(routeConfig)}
        </StaticRouter>
      </Provider>
    </ChunkExtractorManager>
  );

  return `
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
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        ${extractor.getScriptTags()}
      </body>
    </html>`;
};
