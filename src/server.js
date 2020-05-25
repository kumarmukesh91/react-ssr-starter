import path from 'path';
import express from 'express';
import { matchRoutes } from 'react-router-config';
// import proxy from 'express-http-proxy';

import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import routeConfig from './routeConfig';

const app = express();
const port = 3000;

app.use(express.static(path.resolve('./build/client/')));
// app.use('/api', proxy('proxy url'));

app.use((req, res) => {
  const store = createStore(req);
  const componentsToRender = matchRoutes(routeConfig, req.path);
  console.log(componentsToRender);
  const promises = componentsToRender.map(({ route }) => {
    return route.loadData && route.loadData(store);
  });
  Promise.all(promises)
    .then(() => {
      res.send(renderer(req, store));
    })
    .catch(() => {
      res.send('Page Not Found');
    });
});

app.listen(port, () => console.log('Server running at 3000'));
