import React from 'react';
import { useContext } from 'react';

import { Routes, Route,Navigate} from 'react-router-dom';

import './App.css';
import MainNavigation from './Components/MainNavigation';
import Login from './Pages/Login';
import Home from './Pages/Home';
import UserProfile from './Pages/UserProfile';
import loginContext from './Store/LoginContext';
import About from './Pages/About'
import Expenses from './Pages/Expenses';
import { ProfileContextProvider } from './Store/ProfileContext';

import ForgotPassword from './Components/ForgotPassword';




function App() {
  const loginCtx = useContext(loginContext);

  return (
    <React.Fragment>
      <MainNavigation />
      <Routes>
        <Route path='/' exact element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />

        {loginCtx.isLoggedIn ? (
          <Route path='/expenses' element={<Expenses />} />
        ) : (
          <Route path='/expenses' element={<Navigate replace to='/login' />} />
        )}

        <Route path='/about' element={<About />} />

        {loginCtx.isLoggedIn ? (
          <Route
            path='/profile'
            element={
              <ProfileContextProvider>
                <UserProfile />
              </ProfileContextProvider>
            }
          />
        ) : (
          <Route path='/profile' element={<Navigate replace to='/login' />} />
        )}

        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword' element={<ForgotPassword />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;


