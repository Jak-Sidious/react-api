import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const Protected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      ))
    }
  />
);
