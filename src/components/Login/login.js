import React from "react";
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
          
        </div>
      </div>
    );
  }
}

export default Login;
