import React, { Component } from 'react';
import Navigation from "../Navbar/navbar";
import { Form, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';

const CREATE_CAT_URL='/category/create';

class createCategory extends Component{
  constructor(props){
    super(props);

    this.state={
        category_name: '',
        category_description: ''
    };
  }

  handleChange = (event) =>{
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleCreate = (event) =>{
    event.preventDefault();

    const newCategory={
      category_name: this.state.category_name,
      category_description: this.state.category_description
    }
    console.log(newCategory);
    axiosInstance
    .post(`${CREATE_CAT_URL}`, newCategory)
    .then((response) => {
      window.localStorage.setItem('token', response.data.token)
      console.log(response.data);
      this.props.history.push('/landing');
      console.log(response);
    });
  }

  render() {
    return(
      <div>
        <Navigation/>
        <div className="categoryBackground">
          <div className="wrapper">
            <Form
              className="form-signin"
              onSubmit={this.handleCreate}>
              <Form.Input className='catNameField'
                autoFocus
                name='category_name'
                type='category_name'
                placeholder='Enter your category Name'
                onChange={this.handleChange}/>
              <Form.Input className='catDescField'
                autoFocus
                name='category_description'
                type='category_description'
                placeholder='Enter the Description'
                onChange={this.handleChange}/>
                <Button className='left floated'
                  fluid
                  color='blue'
                  value='submit'
                  type='submit'
                  size='large'>
                  Create Category
                </Button>
                <br/>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

  export default createCategory;
