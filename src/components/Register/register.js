import React from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:5000/apiv1/';
const REGISTRATION_URL = 'users/register';
class Register extends React.Component{
  constructor(props){
    super(props);

    this.state={
      register :{
        username: '',
        email: '',
        password: ''
      }
    };
  }

  handleChange = (event) =>{
    const {name, value} = event.target;
    this.setState({[name]: value});
  }


  handleRegister = (event) =>{
    event.preventDefault();

    const newUser = {
      username : this.state.register.username,
      email : this.state.register.email,
      password : this.state.register.password
    }
    console.log(this.state);
    axios.post(`${ROOT_URL}${REGISTRATION_URL}`, newUser)
    .then((response) => {
      this.props.history.push('/login');
      console.log(response);
    });
  }

  render(){
    return(
      <div className="regBackground">
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
            <Button
              className="proceed"
              bsStyle="success"
              bsSize="xs"
              href="/login"
              block>
              Proceed to login
            </Button>
          </form>

        </div>
      </div>
    );
  }
}

export default Register;
