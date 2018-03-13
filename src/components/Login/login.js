import React from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:5000/apiv1/';
const LOGIN_URL = 'users/login';
class Login extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username: '',
      password: ''
    };
  }
  handleChange = (event) =>{
    const {name, value} = event.target;
    this.setState({[name]: value});
  }


  handleLogin = (event) =>{
    event.preventDefault();
    const {username: username, password: password} = this.state;
    console.log(this.state);
    axios.post(`${ROOT_URL}${LOGIN_URL}`, this.state)
    .then((response) => {
      this.props.history.push('/landing');
      console.log(response);
    });
  }

  render() {
    return(
      <div className="wrapper">
        <form
          className="form-signin"
          onSubmit={this.handleLogin}>
          <h2 className="form-signin-heading">Please login</h2>
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
            <FormControl className="passwordField"
              autoFocus
              name="password"
              type="password"
              onChange={this.handleChange}
              placeholder="Enter Username"
            />
          <br/>
            <Button
              type="submit"
              bsStyle="success"
              bsSize="large"
              block>
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
