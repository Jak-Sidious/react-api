// Modal that takes care of the creation of Recipes
import React, { Component } from 'react';
import notify from 'react-notify-toast';
import { Modal, Form, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';

class ModalCreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipie_name: '',
      ingredients: '',
      category_id: '',
      showModal1: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  // Function /event to handle changes made to the form
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Function that caters to the creation of new recipes
  handleCreate(e) {
    e.preventDefault();

    const catId = this.props.category_id;
    const catName = this.props.category_name;

    const newRecipe = {
      recipie_name: this.state.recipie_name,
      ingredients: this.state.ingredients
    };
    console.log(newRecipe);
    console.log(catId);
    axiosInstance
      .post(`/category/${catId}/recipes/create`, newRecipe, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        window.localStorage.setItem('category', catName)
        window.location.assign(`/category/${catId}/recipes/list`);
        notify.show(`${response.status.data.message}`);
      })
      .catch(error => {
        if (error.response) {
          notify.show(`${error.response.data.message}`)
        }
      });
  }

  // function to close the modal on button click
  closeModal1() {
    this.setState({ showModal1: false });
  }

  render() {
    return (
      <Modal
        closeIcon
        onClose={this.props.closeModal1}
        open={this.props.showModal1}
      >
        <Modal.Header>Create Recipe</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Recipe Name"
              name="recipie_name"
              onChange={this.handleChange}
            />
            <Form.TextArea
              label="Recipe ingredients"
              name="ingredients"
              onChange={this.handleChange}
            />
            <Button onClick={this.handleCreate} color="blue">
              Create
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalCreateRecipe;
