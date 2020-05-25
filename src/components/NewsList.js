import React from 'react';
import PropTypes from 'prop-types';

function NewsList({ hits }) {
  return (
    <ul>
      {hits.map((hit) => (
        <li key={hit.objectID}>{hit.title}</li>
      ))}
    </ul>
  );
}

NewsList.propTypes = {
  hits: PropTypes.arrayOf(Object).isRequired,
};

export default NewsList;
