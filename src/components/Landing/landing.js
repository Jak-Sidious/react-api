// component that renders the landing page
import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import Navigation from '../Navbar/navbar';

class Landing extends Component {
  render() {
    const { location: { pathname } } = this.props;
    console.log(pathname);
    return (
      <div className="mainBackground">
        <Navigation pathname={pathname} />
        <Notifications />

        <h1 className="Welcome">Welcome to yummy recipes</h1>
      </div>
    );
  }
}

export default Landing;
