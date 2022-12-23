import React, { useState, useRef ,useContext} from 'react';

import classes from './Login.module.css';
import loginContext from '../Store/LoginContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const loginCtx = useContext(loginContext);
  const navigate = useNavigate();
    

  const accountHandler = () => {
    setHaveAccount((preState) => {
      return !preState;
    });
  };

  let url;

  if (haveAccount) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfn9W04IeYuEgFhPbEMU1X07J32SmVnT0';
  } else {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfn9W04IeYuEgFhPbEMU1X07J32SmVnT0';
  }

  const loginFormHandler = async (event) => {
    event.preventDefault();

    if (!haveAccount) {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return alert('Passwords does not match');
      }
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
          console.log('User has logged in');
          localStorage.setItem('idToken', data.idToken)
          setHaveAccount(true);
          emailRef.current.value = '';
          passwordRef.current.value = '';
          loginCtx.login();
          navigate('/profile');
      } else {
        const data = await res.json();
        throw data.error;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className={classes.mainDiv}>
    <form className={classes.form} onSubmit={loginFormHandler}>
      <input type='email' placeholder='email' ref={emailRef} />
      <input type='password' placeholder='password' ref={passwordRef} />
      {!haveAccount && (
        <input
          type='password'
          placeholder='confirm password'
          ref={confirmPasswordRef}
        />
      )}
      <button type='submit'>
        {haveAccount ? 'Login' : 'Create Account'}
      </button>
      {haveAccount ? <Link to='/'>Forgot Password</Link> : ''}
    </form>
    <div className={classes.login} onClick={accountHandler}>
      {haveAccount
        ? `Don't have an account? Sign Up`
        : `Have an account? Sign In`}
      </div>
    </div>
  );
};

export default Login;
