import React, { Component } from "react";
import Navigation from "../Navbar/navbar";
import Notifications from 'react-notify-toast';


class Landing extends Component{
  // constructor(props){
  //   super(props);
  //
  //   this.state={
  //
  //   };
  // }

  render() {
    const { location: { pathname } } = this.props;
    console.log(pathname);
    return(
      <div className="mainBackground">
      <Navigation pathname={pathname}/>
      <Notifications />


      </div>
    );
  }
}



export default Landing;
