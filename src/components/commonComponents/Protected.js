// script to handle the protection of routes
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Protected = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);

export default Protected;
