import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import { Form, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';
import Navigation from '../Navbar/navbar';

const CREATE_CAT_URL = '/category/create'; // url for the creation of category
class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category_name: '',
      category_description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  // Event Handler for changes made to the create form
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Event handler for the creation of the new category
  handleCreate(event) {
    event.preventDefault();

    // Constant used to store dertails from the form
    const newCategory = {
      category_name: this.state.category_name,
      category_description: this.state.category_description
    };
    axiosInstance
      .post(`${CREATE_CAT_URL}`, newCategory, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        this.props.history.push('/viewCat');
        notify.show(`${response.status.data.message}`);
      })
      .catch(error => {
        if (error.response) {
          notify.show(
            `Category with the name ${this.state.category_name} already exists`
          );
        }
      });
  }

  render() {
    const { location: { pathname } } = this.props;
    return (
      <div>
        <Navigation />
        <Notifications pathname={pathname} />
        <div className="createCat">
          <div className="wrapper">
            <Form className="form-signin" onSubmit={this.handleCreate}>
              <Form.Input
                className="catNameField"
                autoFocus
                name="category_name"
                type="category_name"
                placeholder="Enter your category Name"
                onChange={this.handleChange}
              />
              <Form.TextArea
                className="catDescField"
                name="category_description"
                type="category_description"
                placeholder="Enter the Description"
                onChange={this.handleChange}
              />
              <Button
                className="left floated"
                fluid
                id="submitButton"
                color="blue"
                value="submit"
                type="submit"
                size="large"
              >
                Create Category
              </Button>
              <br />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCategory;
