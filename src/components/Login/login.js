// Component that has the login page
import React from 'react';
import Notifications, { notify } from 'react-notify-toast';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../commonComponents/AxiosInstance';

const LOGIN_URL = 'users/login';
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // Handle changes to the form
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Event handler for user pressing the login button on the form
  handleLogin(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    axiosInstance
      .post(`${LOGIN_URL}`, user)
      .then(response => {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('user', response.data.user);
        this.props.history.push('/landing');
        notify.show(`${response.status.data.message}`);
      })
      .catch(error => {
        if (error.response) {
          notify.show(`${error.response.data.message}`)
        }
      });
  }

  render() {
    return (
      <div className="logBackground">
        <Notifications />
        <div className="wrapper">
          <Form className="form-signin" onSubmit={this.handleLogin}>
            <h2 className="form-signin-heading">Login Form</h2>

            <Form.Input
              className="nameField"
              autoFocus
              name="username"
              type="username"
              placeholder="Enter username"
              onChange={this.handleChange}
            />
            <Form.Input
              className="passwordField"
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={this.handleChange}
            />
            <Button
              className="left floated"
              id="btn1"
              color="blue"
              value="submit"
              type="submit"
              size="large"
            >
              Login
            </Button>
            <Button
              className="right floated"
              id="btn"
              action="/login"
              color="green"
              size="large"
              as={Link}
              to="/"
            >
              Register
            </Button>
            <br />
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
