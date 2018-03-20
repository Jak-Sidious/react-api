import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';

class ModalEditCat extends Component{
  constructor(props) {
    super(props);
    this.state = {
      category_name: '',
      category_description: '',
      category_id: '',
      showModal: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }


  handleChange = (event) =>{
    const { name, value } = event.target;
    this.setState({[name]: value});
    console.log(this.state);
  }

  handleEdit(e) {
    e.preventDefault();
    console.log(this.state.category_name);
    console.log(this.state.category_description);
    console.log(this.props.category_id);
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render(){
    // const {
    //   category_name,
    //   category_description
    // } = this.state

    return (
      <Modal closeIcon
        onClose={this.props.closeModal}
        open={this.props.showModal}
        size={'small'}>
        <Modal.Header>My Modal</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label='Category name'
              name='category_name'
              onChange={this.handleChange}
            />
            <Form.Input
              label='Category description'
              name='category_description'
              onChange={this.handleChange}
            />
            <Button onClick={this.handleEdit}>Save</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ModalEditCat;
