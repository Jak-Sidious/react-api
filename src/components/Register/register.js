import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel,Label} from "react-bootstrap";
// import "./register.css";

class Register extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username:"",
      password:"",
      email:"",
    };
  }

  render() {
    return(
      <div className="wrapper">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please login</h2>
          <FormGroup
            controlID="formBasicText"
          >
            <FormControl className="nameField"
              autoFocus
              type="username"
              value={this.state.username}
              // onChange
              placeholder="Enter Username"
            />
            <FormControl className="passwordField"
              autofocus
              type="password"
              value={this.state.password}
              // onchange
              placeholder="Enter Username"
            />
            <FormControl className="emailField"
              autoFocus
              type="email"
              value={this.state.email}
              //onChange
              placeholder="Enter email address"
            />
            <Button bsStyle="primary" bsSize="large" block>
              Login
            </Button>

            <FormControl.Feedback />
          </FormGroup>
        </form>



      </div>
    );
  }
}

export default Register;
