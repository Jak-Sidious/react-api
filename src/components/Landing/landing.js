import React, { Component } from "react";
import Navigation from "../Navbar/navbar";
import Notifications, { notify } from 'react-notify-toast';


class Landing extends Component{
  // constructor(props){
  //   super(props);
  //
  //   this.state={
  //
  //   };
  // }

  render() {

    return(
      <div className="mainBackground">
      <Navigation/>
      <Notifications />


      </div>
    );
  }
}



export default Landing;
