import React from 'react';

import { Routes, Route,Navigate} from 'react-router-dom';
import { useContext } from 'react';
import './App.css';
import MainNavigation from './Components/MainNavigation';
import Login from './Pages/Login';
import Home from './Pages/Home';
import UserProfile from './Pages/UserProfile';
import loginContext from './Store/LoginContext';
import About from './Pages/About'
import Product from './Pages/Product';
function App() {
  const loginCtx = useContext(loginContext);

  return (
    <React.Fragment>
      <MainNavigation />
      <Routes>
        <Route path='/' exact element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />

        {loginCtx.isLoggedIn ? (
          <Route path='/product' element={<Product />} />
        ) : (
          <Route path='/product' element={<Navigate replace to='/login' />} />
        )}

        <Route path='/about' element={<About />} />

        {loginCtx.isLoggedIn ? (
          <Route path='/profile' element={<UserProfile />} />
        ) : (
          <Route path='/profile' element={<Navigate replace to='/login' />} />
        )}

        <Route path='/login' element={<Login />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

