import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import axiosInstance from '../commonComponents/AxiosInstance';
import  notify  from 'react-notify-toast';


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

    const cat_id = this.props.category_id;

    const editedCategory ={
      category_name: this.state.category_name,
      category_description: this.state.category_description,
    }
    console.log(editedCategory);
    console.log(cat_id);
    axiosInstance
    .put(`/category/${this.props.category_id}`,
      editedCategory,
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data.message);
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}


  closeModal = () => {
    this.setState({ showModal: false })
  }

  render(){
      return (
        <Modal closeIcon
          onClose={this.props.closeModal}
          open={this.props.showModal}>
          <Modal.Header>My Modal</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input
                label='Category name'
                name='category_name'
                onChange={this.handleChange}
              />
              <Form.TextArea
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
