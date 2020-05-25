import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';

function App({ route }) {
  return (
    <>
      <div className="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
      <Header />
      {renderRoutes(route.routes)}
      <Footer />
    </>
  );
}

App.propTypes = {
  route: PropTypes.objectOf().isRequired,
};

export default App;
