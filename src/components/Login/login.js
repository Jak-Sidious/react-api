import React from "react";
import { Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axiosInstance from '../commonComponents/AxiosInstance';
import Notifications, { notify } from 'react-notify-toast';

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
      if(response.status === 200){
        notify.show('User succesfully logged in');
        this.props.history.push('/landing');
      }
      }).catch((error) =>{
        console.log(error.response.data.message);
        if(error.response.data.message === 'User not registered'){
          notify.show('User not registered, please proceed to registration page.')
        }
      })
      // window.localStorage.setItem('token', response.data.token)
      // console.log(response.data);
    }


  // handleRegister = (event) =>{
  //   event.preventDefault();
  //
  //   const newUser = {
  //     username : this.state.username,
  //     email : this.state.email,
  //     password : this.state.password
  //   }
  //   console.log(newUser);
  //   axiosInstance
  //   .post(`${REGISTRATION_URL}`, newUser)
  //   .then((response) => {
  //     if(response.status === 201){
  //       notify.show('User succesfully Registered');
  //     }
  //   }).catch((error) => {
  //     console.log(error.response);
  //     if(error.response.data.message === 'Username ' + this.state.username +' already exists') {
  //       notify.show('Username '+ this.state.username + ' already exists');
  //     } else if (error.response.data.message === "Password must be between 6 and 25 alphanumeric characters") {
  //       notify.show("Password must be between 6 and 25 alphanumeric characters");
  //     } else if (error.response.data.message === "Username is invalid it should contain alphanumeric charcaters followed by an underscore of not more than 25 characters"){
  //       notify.show("Username cannot start with a number");
  //     }
  //   });
  // }

  render() {
    return(
      <div className="logBackground">
        <Notifications />
        <div className="wrapper">
          <Form
            className="form-signin"
            onSubmit={this.handleLogin}>
            <h2 className="form-signin-heading">Login Form</h2>

              <Form.Input className='nameField'
                autoFocus
                name='username'
                type='username'
                placeholder='Enter username'
                onChange={this.handleChange}/>
              <Form.Input className='passwordField'
                autoFocus
                name='password'
                type='password'
                placeholder='Enter password'
                onChange={this.handleChange}
              />
              <Button className='left floated'
                color='blue'
                value='submit'
                type='submit'
                size='large'>
                Login
              </Button>
              <Button className='right floated'
                action='/login'
                color='green'
                size='large'
                as={ Link } to='/'>
                Register
              </Button>
              <br/>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
