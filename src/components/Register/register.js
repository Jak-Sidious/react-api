import React from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import axios from 'axios';

class Register extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username: '',
      email: '',
      password: ''
    }
  }


  handleChange = (event) =>{
    const {name, value} = event.target;
    this.setState({[name]: value});
  }


  handleRegister = (event) =>{
    const {username: username, email: email, password: password} = this.state;

    axios.post('https')
  }

  render() {
    // console.log(this.state);

    return(
      <div className="wrapper">
        <form className="form-signin">
          <h2 className="form-signin-heading">Registration form</h2>
          <FormGroup onSubmit={this.handleRegister}
            controlid="formBasicText"
          >
            <FormControl className="nameField"
              autoFocus
              name="username"
              type="username"
              onChange={this.handleChange}

              placeholder="Enter Username"
            />
            <FormControl className="emailField"
              autoFocus
              name="email"
              type="email"
              onChange={this.handleChange}
              placeholder="Enter email"
            />
            <FormControl className="passwordField"
              autoFocus
              name="password"
              type="password"
              onChange={this.handleChange}
              placeholder="Enter password"
            />
            <br/>
            <Button bsStyle="primary" bsSize="large" block>
              Register
            </Button>

            <FormControl.Feedback />
          </FormGroup>
        </form>



      </div>
    );
  }
}

export default Register;
