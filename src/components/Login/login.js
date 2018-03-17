import React from "react";
import { Form, Button } from 'semantic-ui-react'
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
                fluid
                color='blue'
                value='submit'
                type='submit'
                size='large'>
                Login
              </Button>
              <br/>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
