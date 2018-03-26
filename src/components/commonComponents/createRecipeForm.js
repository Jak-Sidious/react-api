import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import { Form, Button, Select } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Navigation from '../Navbar/navbar';
import axiosInstance from '../commonComponents/AxiosInstance';

class CreateRecipeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      categoryName: '',
      category_description: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }


  componentDidMount() {
    axiosInstance
      .get(`/category/list`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        const categories = response.data;
        console.log(categories);
        this.setState({ categories: categories });
        console.log(this.state);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }

  render() {
    const { location: { pathname } } = this.props;
    let optionsItems = this.state.categories.map((categories) =>
        <option key={categories.category_name}>{categories.category_name}</option>
        );

    return(
      <div>
        <Navigation pathname={pathname} />
        <Notifications />
        <div className="RecipeCreate">

          <div className="wrapper">

            <Form className="form-signin">
              <h2 className="form-signin-heading">Create Recipe Form</h2>
              <Form.Field
                control={Select}
                className="categoryName"
                name="categoryName"
                type="categoryName"
                placeholder='Select Category'
                fluid selection
                options = {optionsItems}
                onChange={this.handleChange}
              />
              <Form.Input
                className="recName"
                autoFocus
                name="RecipeName"
                type="RecipeName"
                placeholder="Enter the Recipe Name"
                fluid
                onChange={this.handleChange}
              />
              <Form.TextArea
                className="ingrid"
                autoFocus
                name="ingredients"
                type="ingredients"
                placeholder="Enter your ingredients"
                onChange={this.handleChange}
              />

            </Form>

          </div>
        </div>
      </div>

    );
  }
}

export default CreateRecipeForm;
