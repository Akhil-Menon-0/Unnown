/* eslint-disable */

 /* eslint-disable */ import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = props => {
  const initialState = {
    user: null,
    newnew: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load user
  const setUser = temp => {
    dispatch({ type: 'SET_USER', payload: temp });
  };
  const setNew = temp => {
    dispatch({ type: 'SET_NEW', payload: temp });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        newnew: state.newnew,
        setUser,
        setNew
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
