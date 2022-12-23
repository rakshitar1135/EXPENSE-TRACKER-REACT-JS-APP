import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import loginContext from '../Store/LoginContext';

const MainNavigation = () => {
  const loginCtx = useContext(loginContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    loginCtx.logout();
    navigate('/login');
  };

  return (
    <div className={classes.mainNav}>
      <nav>
        <ul>
          <li>
            <NavLink
              to='/home'
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/expenses'
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/profile'
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              User Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/login'
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      {loginCtx.isLoggedIn && (
        <div className={classes.button}>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default MainNavigation;