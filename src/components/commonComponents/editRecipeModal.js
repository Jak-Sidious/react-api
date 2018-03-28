// Modal to cater for/ to the editing of recipes
import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';

class ModalEditRec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '',
      recipeId: '',
      recipeName: '',
      recipieDesc: '',
      showModal: false
    };
  }

  // Function used to close modal
  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Modal
        closeIcon
        onClose={this.props.closeModal}
        open={this.props.showModal}
      >
        <Modal.Header>Edit Recipe</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Recipe name"
              name="recipeName"
              value={this.props.name}
              onChange={this.props.handleChange}
            />
            <Form.TextArea
              label="Recipe Description"
              name="ingrain"
              value={this.props.contentz}
              onChange={this.props.handleChange}
            />
            <Button
              id="recEdit"
              onClick={this.props.handleEdit}
              color="blue">
              Save
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalEditRec;
