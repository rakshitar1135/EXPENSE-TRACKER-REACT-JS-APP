import './App.css';
import MainNavigation from './Components/MainNavigation';
import Login from './Pages/Login';
import React from 'react';
import Home from './Pages/Home';
import UserProfile from './Pages/UserProfile';
import { Route,Routes } from 'react-router-dom';
function App() {
  return (
    <React.Fragment>
      <MainNavigation/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<UserProfile />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
