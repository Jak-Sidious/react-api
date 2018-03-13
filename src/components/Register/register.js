import React from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import axios from 'axios';
import {notify} from'react-notify-toast';

const ROOT_URL = 'http://127.0.0.1:5000/apiv1/';
const REGISTRATION_URL = 'users/register';
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
    event.preventDefault();
    const {username: username, email: email, password: password} = this.state;
    console.log(this.state);
    axios.post(`${ROOT_URL}${REGISTRATION_URL}`, this.state)
    .then((response) => {
      this.props.history.push('/login');
      console.log(response);
    });
  }

  render(){
    return(
      <div className="wrapper">
        <form
          className="form-signin"
          onSubmit={this.handleRegister}>
          <h2 className="form-signin-heading">Registration form</h2>
          <FormGroup
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
            <Button
              type="submit"
              bsStyle="primary"
              bsSize="large"
              block>
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
