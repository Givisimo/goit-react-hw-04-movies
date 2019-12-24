const key = 'aa2f9b4a9cbaacd0d590386d1fd42daf';

const fetchTrendMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
  ).then(res => res.json());
};

const fetchSearchQuery = query => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${query}`,
  ).then(res => res.json());
};
const fetchMovieDetails = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`,
  ).then(res => res.json());
};

const fetchCastDetails = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`,
  ).then(res => res.json());
};

const fetchReviews = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}&page=1`,
  ).then(res => res.json());
};

export default {
  fetchTrendMovies,
  fetchSearchQuery,
  fetchMovieDetails,
  fetchCastDetails,
  fetchReviews,
};
