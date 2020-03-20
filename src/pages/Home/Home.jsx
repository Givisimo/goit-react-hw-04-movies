import React, { useEffect, useState } from 'react';
import { Route, Link, useLocation } from 'react-router-dom';
import routes from '../../App/routes';
import movieApi from '../../services/movieApi';
import MovieDetails from '../MovieDetails/MovieDetails';

const Home = () => {
  const [movies, handleMovies] = useState([]);

  const location = useLocation();

  useEffect(() => {
    movieApi.fetchTrendMovies().then(data => handleMovies(data.results));
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {movies.length > 0 &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${routes.MOVIES}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.name ? movie.name : movie.title}
              </Link>
            </li>
          ))}
      </ul>
      <Route path={`${routes.MOVIES}/:id`} component={MovieDetails} />
    </div>
  );
};

export default Home;
