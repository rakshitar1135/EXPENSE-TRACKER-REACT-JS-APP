import React from 'react';

import classes from './MainNavigation.module.css';
import { Link } from 'react-router-dom';
const MainNavigation = () => {
  return (
    <div className={classes.mainNav}>
      <nav>
        <ul>
          <li>
          <Link to='/home'>Home</Link>
          </li>
          <li>
          <Link to='/product'>Products</Link>
          </li>
          <li>
          <Link to='/about'>About Us</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;