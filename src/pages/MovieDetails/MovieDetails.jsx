import React, { useState, useEffect } from 'react';
import {
  Route,
  Link,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';

import movieApi from '../../services/movieApi';
import CastPage from '../CastPage/CastPage';
import ReviewPage from '../ReviewPage/ReviewPage';
import routes from '../../App/routes';

const MovieDetails = () => {
  const [movie, handleMovie] = useState('');
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const onGoBack = () => {
    if (location.state && location.state.from) {
      history.push(location.state.from);
      return;
    }
    history.push(routes.MOVIES);
  };

  const getMovieDetails = () => {
    const { params } = match;
    movieApi.fetchMovieDetails(params.id).then(data => handleMovie(data));
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  const { backdrop_path: backdropPath, vote_average:VoltAverage, overview, genres } = movie;
  return (
    <>
      {movie && (
        <div>
          <button type="button" onClick={onGoBack}>
            Go back
          </button>
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
          />
          <h2>{movie.title}</h2>
          <p>User score: {VoltAverage * 10}%</p>
          <p>Overview</p>
          <p>{overview}</p>
          <div>
            {genres.length > 0 &&
              genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
          </div>
          <ul>
            <li>
              <Link
                to={{
                  pathname: `${match.url}/Cast`,
                  state: location.state,
                }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `${match.url}/Reviews`,
                  state: location.state,
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      )}
      <Route path={`${match.path}/Cast`} component={CastPage} />
      <Route path={`${match.path}/Reviews`} component={ReviewPage} />
    </>
  );
};

export default MovieDetails;
