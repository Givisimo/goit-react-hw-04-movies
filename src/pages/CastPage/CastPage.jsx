import React, { Component } from 'react';
import T from 'prop-types';
import movieApi from '../../services/movieApi';

class CastPage extends Component {
  static propTypes = {
    match: T.instanceOf(Object).isRequired,
  };

  state = {
    cast: null,
  };

  componentDidMount() {
    const { match } = this.props;
    movieApi.fetchCastDetails(match.params.id).then(data => {
      const shortCast = data.cast.slice(0, 4);
      this.setState({ cast: shortCast });
    });
  }

  render() {
    const { cast } = this.state;
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
  }
}

export default CastPage;
