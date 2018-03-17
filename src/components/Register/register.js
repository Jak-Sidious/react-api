import React from "react";
import { Button, Form } from 'semantic-ui-react'
import axiosInstance from '../commonComponents/AxiosInstance';


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
    console.log(this.state);
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
      this.props.history.push('/login');
      console.log(response);
    })
    .catch((error) => {
      if(error.response) {
        console.log(error.response.data.message);
      }
    });
  }

  render(){
    return(
      <div className="regBackground">
        <div className="wrapper">
          <Form className="form-signin">
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
              <Button className='registerBtn'
                color='blue'
                type='submit'
                size='large'>
                Register
              </Button>
          </Form>

        </div>
      </div>
    );
  }
}

export default Register;
