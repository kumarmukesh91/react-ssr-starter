import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../stores';

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: 'https://hn.algolia.com/api/v1',
    headers: { cookie: req.get('cookie') || '' },
  });
  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return store;
};
