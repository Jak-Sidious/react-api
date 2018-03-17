import React from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import axiosInstance from '../commonComponents/AxiosInstance';

const LOGIN_URL = 'users/login';
class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
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
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(this.state);

    axiosInstance
    .post(`${LOGIN_URL}`, user)
    .then((response) => {
      window.localStorage.setItem('token', response.data.token)
      console.log(response.data);
      this.props.history.push('/landing');
      console.log(response);
    });
  }

  render() {
    return(
      <div className="logBackground">
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
      </div>
    );
  }
}

export default Login;
