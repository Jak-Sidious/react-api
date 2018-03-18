import React, { Component } from 'react';
import Navigation from "../Navbar/navbar";

class createCategory extends Component{
  constructor(props){
    super(props);

    this.state={
        category_name: '',
        category_description: ''
    };
  }

  render() {
    return(
      <div>
        <Navigation/>
        <h1>I wonder</h1>
      </div>
    );
  }
}

  export default createCategory;
