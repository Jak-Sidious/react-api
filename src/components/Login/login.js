import React from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";


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
    console.log(this.state);
  }


  // handleRegister = (event) =>{
  //   event.preventDefault();
  //   const {username: username, email: email, password: password} = this.state;
  //   console.log(this.state);
  //   axios.post(`${ROOT_URL}${REGISTRATION_URL}`, this.state)
  //   .then((response) => {
  //     this.props.history.push('/login');
  //     console.log(response);
  //   });
  // }

  render() {
    return(
      <div className="wrapper">
        <form className="form-signin">
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
            <Button bsStyle="primary" bsSize="large" block>
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
