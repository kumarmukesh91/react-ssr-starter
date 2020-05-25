import HelloSsr from './pages/HelloSsr';
import NewsPage from './pages/NewsPage';
import App from './App';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        ...HelloSsr,
      },
      {
        path: '/news',
        ...NewsPage,
      },
    ],
  },
];
