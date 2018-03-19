import React from "react";
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../commonComponents/AxiosInstance';
import  Notifications, { notify } from 'react-notify-toast';



const REGISTRATION_URL = 'users/register';
class Register extends React.Component{
  constructor(props){
    super(props);

    this.state={
        username: '',
        email: '',
        password: ''
    };
  }

  handleChange = (event) =>{
    const { name, value } = event.target;
    this.setState({[name]: value});
  }


  handleRegister = (event) =>{
    event.preventDefault();

    const newUser = {
      username : this.state.username,
      email : this.state.email,
      password : this.state.password
    }
    console.log(newUser);
    axiosInstance
    .post(`${REGISTRATION_URL}`, newUser)
    .then((response) => {
      if(response.status === 201){
        notify.show('User succesfully Registered');
      }
    }).catch((error) => {
      console.log(error.response);
      if(error.response.data.message === 'Username ' + this.state.username +' already exists') {
        notify.show('Username '+ this.state.username + ' already exists');
      } else if (error.response.data.message === "Password must be between 6 and 25 alphanumeric characters") {
        notify.show("Password must be between 6 and 25 alphanumeric characters");
      } else if (error.response.data.message === "Username is invalid it should contain alphanumeric charcaters followed by an underscore of not more than 25 characters"){
        notify.show("Username cannot start with a number");
      }
    });
  }

    render(){
      return(
      <div className="regBackground">
        <Notifications />
        <div className="wrapper">
          <Form
            className="form-signin"
            onSubmit={this.handleRegister}>
            <h2 className="form-signin-heading">Registration form</h2>

              <Form.Input className='nameField'
                autoFocus
                name='username'
                type='username'
                placeholder='Enter your username'
                onChange={this.handleChange}/>
              <Form.Input className='emailField'
                autoFocus
                name='email'
                type='email'
                placeholder='Enter email'
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
                Register
              </Button>

              <Button className='right floated'
                action='/login'
                color='green'
                size='large'
                as={ Link } to='/login'>
                Proceed to Login
              </Button>
              <br/>
          </Form>

        </div>
      </div>
    );
  }
}

export default Register;
