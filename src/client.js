import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import thunk from 'redux-thunk';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './stores';
import routeConfig from './routeConfig';

const axiosInstance = axios.create({
  baseURL: 'https://hn.algolia.com/api/v1',
});
// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  // eslint-disable-next-line no-undef
  window.INITIAL_STATE,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
);
loadableReady(() => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(routeConfig)}</BrowserRouter>
    </Provider>,
    // eslint-disable-next-line no-undef
    document.getElementById('root')
  );
});
