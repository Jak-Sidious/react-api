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

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.props.location.state.category_name);
  }

  handleCreate(e) {
    e.preventDefault();

    const catId = this.props.category_id;

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
        if (response.status === 201) {
          window.location.assign(`/category/${catId}/recipes/list`);
          notify.show('Recipe successfully created');
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }

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
