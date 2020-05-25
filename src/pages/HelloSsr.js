import React from 'react';

function HelloSsr() {
  return <h1>Hello SSR</h1>;
}

function loadData(store) {
  // return store.dispatch(fetchNews());
}

export default {
  component: HelloSsr,
  loadData,
};
