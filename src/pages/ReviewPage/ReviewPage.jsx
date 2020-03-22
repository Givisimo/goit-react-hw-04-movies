import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import movieApi from '../../services/movieApi';

const ReviewPage = () => {
  const message = 'No reviews yet.';
  const [reviews, handleReviews] = useState([]);
  const match = useRouteMatch();

  useEffect(() => {
    movieApi.fetchReviews(match.params.id).then(data => {
      handleReviews(data.results);
    });
  }, []);
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
};

export default ReviewPage;
