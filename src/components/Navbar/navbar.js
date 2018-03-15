import React from "react";
import {Navbar} from "react-bootstrap";

class Navbar extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username: '',
      email: '',
      password: ''
    }
  }
}
