import React, { useState } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import superagent from 'superagent';

dotenv.config();

const API = process.env.REACT_APP_API;
const SECRET = process.env.JWT_SECRET;

export const LoginContext = React.createContext();

export default function LoginProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const login = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set('authorization', `Basic ${btoa(`${username}:${password}`)}`);
      validateToken(response.body.token);
    } catch (error) {
      console.error(error.message);
    }
  };

  let setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setLoggedIn(loggedIn);
    setUser(user);
  };

  const validateToken = (token) => {
    try {
      let user = jwt.decode(token, SECRET);
      setLoginState(true, token, user);
    } catch (e) {
      setLoginState(false, null, {});
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  const state = {
    login,
    logout,
    user,
    loggedIn,
  };
  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
