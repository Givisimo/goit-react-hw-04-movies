import React, { useState, useEffect } from 'react';
import {
  Route,
  Link,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import queryString from 'query-string';

import movieApi from '../../services/movieApi';
import MovieDetails from '../MovieDetails/MovieDetails';

const MoviesPage = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const [movies, handleMovies] = useState([]);

  const [query, handleQuery] = useState('');

  useEffect(() => {
    const searchQuery = queryString.parse(location.search);
    if (!searchQuery.query) {
      return;
    }
    movieApi
      .fetchSearchQuery(searchQuery.query)
      .then(data => handleMovies(data.results));
  }, [location.search]);

  const setSearchQuery = () => {
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = queryString.parse(location.search);
    if (query === searchQuery.query) {
      return;
    }

    movieApi.fetchSearchQuery(query).then(data => handleMovies(data.results));
    setSearchQuery();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={event => handleQuery(event.target.value)}
          name="name"
          value={query}
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${match.url}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {' '}
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Route path={`${match.path}/:id`} component={MovieDetails} />
    </>
  );
};

export default MoviesPage;
