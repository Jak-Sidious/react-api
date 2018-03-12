import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel,Label} from "react-bootstrap";
// import "../..public/styles/base.css";
// public/styles/base.css
// /Users/jakanakiwanuka/work/react-api/src/components/Login/login.js
// /Users/jakanakiwanuka/work/react-api/public/styles/base.css

class Login extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username:"",
      password:""
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

export default Login;
