import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import queryString from 'query-string';
import T from 'prop-types';
import movieApi from '../../services/movieApi';
import MovieDetails from '../MovieDetails/MovieDetails';

class MoviesPage extends Component {
  static propTypes = {
    location: T.instanceOf(Object).isRequired,
    history: T.instanceOf(Object).isRequired,
    match: T.instanceOf(Object).isRequired,
  };

  state = {
    movies: [],
    query: '',
  };

  componentDidMount() {
    const { location } = this.props;
    const searchQuery = queryString.parse(location.search);
    if (!searchQuery.query) {
      return;
    }
    movieApi
      .fetchSearchQuery(searchQuery.query)
      .then(data => this.setState({ movies: data.results }));
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const query = queryString.parse(location.search);
    const prevQuery = queryString.parse(prevProps.location.search);
    if (query.query === prevQuery.query) {
      return;
    }
    movieApi
      .fetchSearchQuery(query.query)
      .then(data => this.setState({ movies: data.results }));
    this.setSearchQuery();
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    movieApi
      .fetchSearchQuery(this.state.query)
      .then(data => this.setState({ movies: data.results }));
    this.setSearchQuery();
  };

  setSearchQuery = () => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${this.state.query}`,
    });
  };

  render() {
    const { query, movies } = this.state;
    const { match, location } = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
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
  }
}

export default MoviesPage;
