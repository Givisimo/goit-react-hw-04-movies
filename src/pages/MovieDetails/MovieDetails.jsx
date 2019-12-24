import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import T from 'prop-types';
import movieApi from '../../services/movieApi';
import CastPage from '../CastPage/CastPage';
import ReviewPage from '../ReviewPage/ReviewPage';
import routes from '../../App/routes';

class MovieDetails extends Component {
  static propTypes = {
    location: T.instanceOf(Object).isRequired,
    history: T.instanceOf(Object).isRequired,
    match: T.instanceOf(Object).isRequired,
  };

  state = {
    movie: null,
  };

  componentDidMount() {
    this.getMovieDetails();
  }

  getMovieDetails = () => {
    const { params } = this.props.match;
    movieApi
      .fetchMovieDetails(params.id)
      .then(data => this.setState({ movie: data }));
  };

  onGoBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      history.push(location.state.from);
      return;
    }
    history.push(routes.MOVIES);
  };

  render() {
    const { movie } = this.state;
    const { match, location } = this.props;

    return (
      <>
        {movie && (
          <div>
            <button type="button" onClick={this.onGoBack}>
              Go back
            </button>
            <img
              alt="poster"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            />
            <h2>{movie.title}</h2>
            <p>User score: {movie.vote_average * 10}%</p>
            <p>Overview</p>
            <p>{movie.overview}</p>
            <div>
              {movie.genres.length > 0 &&
                movie.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
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
  }
}

export default MovieDetails;
