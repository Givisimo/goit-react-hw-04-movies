import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import styles from './App.module.css';
import Navigation from './Navigation/Navigation';
import Home from '../pages/Home/Home';

import routes from './routes';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import MovieDetails from '../pages/MovieDetails/MovieDetails';

class App extends Component {
  state = {};

  render() {
    return (
      <div className={styles.App}>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path={routes.HOME} component={Home} />
            <Route path={routes.MOVIE_DETAILS} component={MovieDetails} />
            <Route path={routes.MOVIES} component={MoviesPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
