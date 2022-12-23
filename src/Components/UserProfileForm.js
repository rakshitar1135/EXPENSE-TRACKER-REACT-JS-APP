import React, { useRef, useContext, useEffect, useCallback } from 'react';

import classes from './UserProfileForm.module.css';
import loginContext from '../Store/LoginContext';


const UserProfileForm = () => {
  const loginCtx = useContext(loginContext);
  const nameRef = useRef();
  const imageRef = useRef();

  const profileSubmitHandler = async (event) => {
    event.preventDefault();

    if (loginCtx.isLoggedIn) {
      try {
        const res = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDnI8lyfaeVbXRvOMiQ0Ip1njunluOmGds',
          {
            method: 'POST',
            body: JSON.stringify({
              idToken: localStorage.getItem('idToken'),
              displayName: nameRef.current.value,
              photoUrl: imageRef.current.value,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          // console.log(data);
        } else {
          throw data.error;
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const getUserProfile = useCallback (async () => {
    try {
      // console.log('called');
      const res = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDnI8lyfaeVbXRvOMiQ0Ip1njunluOmGds',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: localStorage.getItem('idToken'),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        nameRef.current.value = data.users[0].displayName;
        imageRef.current.value = data.users[0].photoUrl;
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  },[]);


  const { isLoggedIn } = loginCtx;

  useEffect(() => {
    if (isLoggedIn) {
      getUserProfile();
    }
  }, [getUserProfile, isLoggedIn]);

  return (
    <form className={classes.form} onSubmit={profileSubmitHandler}>
      <div className={classes.formHead}>
        <span>Contact Details</span>
        <button>Cancel</button>
      </div>
      <div className={classes.formBody}>
        <label>Full Name:</label>
        <input type='text' ref={nameRef} />
        <label>Profile Photo URL:</label>
        <input type='text' ref={imageRef} />
        <div className={classes.button}>
          <button type='submit'>Update</button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;