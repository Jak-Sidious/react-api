// Component that deals with user registration
import React from 'react';
import Notifications, { notify } from 'react-notify-toast';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../commonComponents/AxiosInstance';

const REGISTRATION_URL = 'users/register'; // url for the registration of new users
class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  // function to handle changes made to the form
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Function to handle the registration of new users
  handleRegister(event) {
    event.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    console.log(newUser);
    axiosInstance
      .post(`${REGISTRATION_URL}`, newUser)
      .then(response => {
        this.props.history.push('/login');
        notify.show(`${response.status.data.message}`);
      })
      .catch(error => {
        if (error.response) {
          notify.show(`${error.response.data.message}`);
        }
      });
  }

  render() {
    return (
      <div className="regBackground">
        <Notifications />
        <div className="wrapper">
          <Form className="form-signin" onSubmit={this.handleRegister}>
            <h2 className="form-signin-heading">Registration form</h2>

            <Form.Input
              className="nameField"
              autoFocus
              name="username"
              type="username"
              placeholder="Enter your username"
              onChange={this.handleChange}
            />
            <Form.Input
              className="emailField"
              autoFocus
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
            />
            <Form.Input
              className="passwordField"
              autoFocus
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={this.handleChange}
            />
            <Button
              className="left floated"
              id="regButton"
              color="blue"
              value="submit"
              type="submit"
              size="large"
            >
              Register
            </Button>

            <Button
              className="right floated"
              action="/login"
              color="green"
              size="large"
              as={Link}
              to="/login"
            >
              Proceed to Login
            </Button>
            <br />
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
