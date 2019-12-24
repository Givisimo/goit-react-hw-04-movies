import React, { Component } from 'react';
import T from 'prop-types';
import movieApi from '../../services/movieApi';

class ReviewPage extends Component {
  static propTypes = {
    match: T.instanceOf(Object).isRequired,
  };

  state = {
    reviews: [],
  };

  componentDidMount() {
    const { match } = this.props;
    movieApi.fetchReviews(match.params.id).then(data => {
      this.setState({ reviews: data.results });
    });
  }

  render() {
    const { reviews } = this.state;
    const message = 'No reviews yet.';
    return (
      <ul>
        {reviews.length === 0 ? (
          <p>{message}</p>
        ) : (
          reviews &&
          reviews.map(review => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))
        )}
      </ul>
    );
  }
}

export default ReviewPage;
