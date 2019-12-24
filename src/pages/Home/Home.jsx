import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import T from 'prop-types';
import routes from '../../App/routes';
import movieApi from '../../services/movieApi';
import MovieDetails from '../MovieDetails/MovieDetails';

class Home extends Component {
  static propTypes = {
    location: T.instanceOf(Object).isRequired,
  };

  state = {
    movies: [],
  };

  async componentDidMount() {
    await movieApi
      .fetchTrendMovies()
      .then(data => this.setState({ movies: data.results }));
  }

  render() {
    const { movies } = this.state;
    const { location } = this.props;
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
  }
}

export default Home;
