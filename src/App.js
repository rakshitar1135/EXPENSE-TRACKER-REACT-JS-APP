import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import MainNavigation from './Components/MainNavigation';
import Login from './Pages/Login';
import Home from './Pages/Home';
import UserProfile from './Pages/UserProfile';
import About from './Pages/About';
import Expenses from './Pages/Expenses';
import ForgotPassword from './Components/ForgotPassword';

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const themeMode = useSelector((state) => state.theme.theme);

  return (
    <div className={themeMode === 'dark' ? 'dark' : ''}>
      <MainNavigation />
      <Routes>
        <Route path='/' exact element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />

        <Route
          path='/expenses'
          element={isLoggedIn ? <Expenses /> : <Navigate to='/login' replace />}
        />

        <Route path='/about' element={<About />} />

        <Route
          path='/profile'
          element={
            isLoggedIn ? <UserProfile /> : <Navigate to='/login' replace />
          }
        />

        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;


