import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import movieApi from '../../services/movieApi';

const CastPage = ({ match }) => {
  const [cast, handleCast] = useState('');

  useEffect(() => {
    movieApi.fetchCastDetails(match.params.id).then(({ cast }) => {
      handleCast(cast.slice(0, 4));
    });
  });
  return (
    <ul>
      {cast &&
        cast.map(item => (
          <li key={item.id}>
            <h3>Hero: {item.character}</h3>
            <p>Actor: {item.name}</p>
            <img
              src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}
              alt=" "
            />
          </li>
        ))}
    </ul>
  );
};
CastPage.propTypes = {
  match: T.instanceOf(Object).isRequired,
};

export default CastPage;
