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


  handleLogin = (event) => {
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
        window.localStorage.setItem('token', response.data.token)
        this.props.history.push('/landing');
        notify.show('User succesfully logged in');
      }
      }).catch((error) => {
        console.log(error.response.data);
        if(error.response.data.message === 'User not registered') {
          notify.show('User not registered, please proceed to registration page.');
        } else if (error.response.data.message === 'Invalid credentials, please try again') {
          notify.show('Incorrect username and/or password entered, please try again');
        }
      })
    }


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
