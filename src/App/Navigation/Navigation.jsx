import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';
import styles from './Navigation.module.css'

const Navigation = () => (
  <ul className={styles.list}>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.MOVIES}>Movies</Link>
    </li>
  </ul>
);

export default Navigation;
