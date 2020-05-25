import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewsList from '../components/NewsList';
import { fetchNews } from '../stores/actions/newsActions';

function NewsPage() {
  const dispatch = useDispatch();
  const hits = useSelector((state) => state.news.hits);
  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return <NewsList hits={hits} />;
}

//loadData method is used to load data for the component in server side.
//Here store points to server side store

function loadData(store) {
  return store.dispatch(fetchNews());
}

export default {
  component: NewsPage,
  loadData,
};
